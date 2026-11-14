"use client";

import { useEffect, useRef } from "react";

// Hero background: underwater footage rendered as a colour halftone by a small
// WebGL shader. Two copies of the clip take turns playing so the loop never
// has to seek back to the start (which stalls for a moment with `loop`).
// Without WebGL the plain footage underneath shows instead.

const VERTEX = `
attribute vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const FRAGMENT = `
precision mediump float;
uniform sampler2D frame;
uniform vec2 resolution;
uniform vec2 videoSize;
uniform float cell;
uniform float cornerRadius;
uniform float panX;

// signed distance to the canvas's rounded-rectangle edge (negative inside)
float edgeDistance(vec2 p) {
  vec2 halfSize = resolution * 0.5;
  vec2 q = abs(p - halfSize) - halfSize + cornerRadius;
  return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - cornerRadius;
}

// maps canvas coordinates to video coordinates, cropping like object-fit: cover,
// zoomed in a little so the footage can be panned sideways
const float ZOOM = 1.2;
vec2 coverUv(vec2 p) {
  vec2 uv = p / resolution;
  float canvasAspect = resolution.x / resolution.y;
  float videoAspect = videoSize.x / videoSize.y;
  if (canvasAspect > videoAspect) {
    uv.y = (uv.y - 0.5) * videoAspect / canvasAspect + 0.5;
  } else {
    uv.x = (uv.x - 0.5) * canvasAspect / videoAspect + 0.5;
  }
  uv = (uv - 0.5) / ZOOM + 0.5;
  // pan so the subject sits further right, without running off the edge
  float slack = 0.5 - 0.5 * min(1.0, (canvasAspect / videoAspect)) / ZOOM;
  uv.x -= min(panX, slack);
  return uv;
}

void main() {
  // dot grid rotated 45 degrees, as in print halftones
  const float c = 0.70710678;
  mat2 rot = mat2(c, -c, c, c);
  vec2 p = rot * gl_FragCoord.xy;
  vec2 center = (floor(p / cell) + 0.5) * cell;
  vec2 centerScreen = center * rot; // inverse rotation (transpose)

  vec3 colour = texture2D(frame, coverUv(centerScreen)).rgb;
  float lum = dot(colour, vec3(0.299, 0.587, 0.114));

  // the footage sits in a narrow band of brightness, so stretch it: dark
  // water drops out entirely and highlights get the biggest dots. Dots are
  // capped just above touching so they stay round and never merge into blocks
  float tone = smoothstep(0.16, 0.45, lum);

  float radius = cell * 0.54 * sqrt(tone);
  float d = length(p - center);
  float dotMask = 1.0 - smoothstep(radius - 0.5, radius + 0.5, d);

  vec3 paper = vec3(0.008, 0.024, 0.05);
  vec3 ink = mix(vec3(0.12, 0.38, 0.95), vec3(0.85, 0.95, 1.0), tone * tone);
  vec3 col = mix(paper, ink, dotMask);

  // darken the text side (left) and the bottom so the copy stays readable
  vec2 uv = gl_FragCoord.xy / resolution;
  float side = uv.x < 0.5 ? mix(0.92, 0.6, uv.x / 0.5) : mix(0.6, 0.05, (uv.x - 0.5) / 0.5);
  float fromTop = 1.0 - uv.y;
  float vert = fromTop < 0.35 ? mix(0.25, 0.0, fromTop / 0.35) : mix(0.0, 0.6, (fromTop - 0.35) / 0.65);
  float shade = (1.0 - side) * (1.0 - vert);
  col = mix(vec3(0.004, 0.03, 0.063), col, shade);

  // draw the rounded corners ourselves (transparent outside) rather than
  // relying on CSS clipping, which some browsers skip for WebGL canvases
  float inside = 1.0 - smoothstep(-0.5, 0.5, edgeDistance(gl_FragCoord.xy));
  gl_FragColor = vec4(col * inside, inside);
}
`;

export default function HeroField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoARef = useRef<HTMLVideoElement>(null);
  const videoBRef = useRef<HTMLVideoElement>(null);
  const fallbackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const videoA = videoARef.current;
    const videoB = videoBRef.current;
    if (!canvas || !videoA || !videoB) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // --- seamless loop: hand over to the other copy as this one ends ---
    let active = videoA;
    let standby = videoB;
    const HANDOVER = 0.12; // seconds before the end to start the standby copy

    const tickLoop = () => {
      if (!active.duration || reduceMotion) return;
      if (standby.paused && active.currentTime >= active.duration - HANDOVER) {
        standby.currentTime = 0;
        void standby.play().catch(() => {});
      }
      if (active.ended || active.currentTime >= active.duration - 0.02) {
        const finished = active;
        active = standby;
        standby = finished;
        finished.pause();
        finished.currentTime = 0;
        active.style.opacity = "1";
        standby.style.opacity = "0";
      }
    };

    if (reduceMotion) {
      videoA.pause();
    } else {
      void videoA.play().catch(() => {});
    }

    // --- halftone renderer ---
    const gl = canvas.getContext("webgl", { antialias: false, alpha: true, premultipliedAlpha: true });
    let frame = 0;
    let running = true;

    const observer = new IntersectionObserver(([entry]) => {
      running = entry.isIntersecting;
    });
    observer.observe(canvas);

    if (!gl) {
      // no WebGL: show the plain videos instead, still looping seamlessly
      if (fallbackRef.current) fallbackRef.current.style.opacity = "1";
      const loop = () => {
        tickLoop();
        frame = requestAnimationFrame(loop);
      };
      frame = requestAnimationFrame(loop);
      return () => {
        cancelAnimationFrame(frame);
        observer.disconnect();
      };
    }

    const compile = (type: number, source: string) => {
      const shader = gl.createShader(type)!;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      return shader;
    };
    const vs = compile(gl.VERTEX_SHADER, VERTEX);
    const fs = compile(gl.FRAGMENT_SHADER, FRAGMENT);
    const program = gl.createProgram()!;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const position = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);

    const uResolution = gl.getUniformLocation(program, "resolution");
    const uVideoSize = gl.getUniformLocation(program, "videoSize");
    const uCell = gl.getUniformLocation(program, "cell");
    const uCornerRadius = gl.getUniformLocation(program, "cornerRadius");
    gl.uniform1f(gl.getUniformLocation(program, "panX"), 0.09);

    // size the canvas to its exact physical pixel count so the browser never
    // resamples it (which blurs the dots, e.g. with 125% display scaling)
    const resize = (deviceWidth?: number, deviceHeight?: number) => {
      const dpr = window.devicePixelRatio || 1;
      const expectedWidth = canvas.clientWidth * dpr;
      const expectedHeight = canvas.clientHeight * dpr;
      // prefer the browser's exact device-pixel size, but only when it agrees
      // with the expected size (some environments report CSS pixels instead)
      canvas.width =
        deviceWidth && Math.abs(deviceWidth - expectedWidth) < 1.5 ? deviceWidth : Math.round(expectedWidth);
      canvas.height =
        deviceHeight && Math.abs(deviceHeight - expectedHeight) < 1.5 ? deviceHeight : Math.round(expectedHeight);
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uResolution, canvas.width, canvas.height);
      gl.uniform1f(uCell, 9 * dpr);
      // match the hero box's corner radius (rounded-[2.5rem] = 40px)
      gl.uniform1f(uCornerRadius, 40 * dpr);
    };
    resize();
    const resizeObserver = new ResizeObserver(([entry]) => {
      const size = entry.devicePixelContentBoxSize?.[0];
      resize(size?.inlineSize, size?.blockSize);
      drawSource(lastSource);
    });
    try {
      resizeObserver.observe(canvas, { box: "device-pixel-content-box" });
    } catch {
      resizeObserver.observe(canvas);
    }

    const drawSource = (source: TexImageSource | null) => {
      if (!source) return;
      const width = source instanceof HTMLVideoElement ? source.videoWidth : (source as HTMLImageElement).naturalWidth;
      const height = source instanceof HTMLVideoElement ? source.videoHeight : (source as HTMLImageElement).naturalHeight;
      gl.uniform2f(uVideoSize, width, height);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, source);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };
    let lastSource: TexImageSource | null = null;

    // draw dots from the poster straight away, before the video can play
    const poster = new Image();
    poster.onload = () => {
      if (lastSource) return;
      lastSource = poster;
      drawSource(poster);
    };
    poster.src = "/hero-ocean-poster.jpg";

    const draw = () => {
      if (active.readyState < 2) return;
      lastSource = active;
      drawSource(active);
    };

    const loop = () => {
      if (running) {
        tickLoop();
        draw();
      }
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      resizeObserver.disconnect();
      poster.onload = null;
      // free GPU objects but keep the context: React may re-run this effect
      gl.deleteTexture(texture);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
    };
  }, []);

  const videoProps = {
    className: "absolute inset-0 h-full w-full object-cover",
    poster: "/hero-ocean-poster.jpg",
    muted: true,
    playsInline: true,
    preload: "auto",
  } as const;

  return (
    <div aria-hidden className="absolute inset-0">
      {/* plain footage, shown only when WebGL isn't available */}
      <div ref={fallbackRef} className="absolute inset-0" style={{ opacity: 0 }}>
        <video ref={videoBRef} {...videoProps} style={{ opacity: 0 }}>
          <source src="/hero-ocean.webm" type="video/webm" />
          <source src="/hero-ocean.mp4" type="video/mp4" />
        </video>
        <video ref={videoARef} {...videoProps}>
          <source src="/hero-ocean.webm" type="video/webm" />
          <source src="/hero-ocean.mp4" type="video/mp4" />
        </video>
        <div className="hero-grade absolute inset-0" />
      </div>
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  );
}
