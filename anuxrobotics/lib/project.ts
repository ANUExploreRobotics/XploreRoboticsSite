// Prototype 1.0 content, taken from Project Brief PB-XR-001 Rev A (25 Aug 2026).
// Update this file when the brief is revised and every page picks it up.

export const requirements = [
  { id: "R-01", requirement: "Have a waterproof housing rated for depths of up to 2.1 metres, which is 20.6 kPa.", verification: "Test" },
  { id: "R-02", requirement: "Achieve controlled surge, heave through buoyancy control, and yaw movement.", verification: "Demonstration" },
  { id: "R-03", requirement: "Be neutrally buoyant to within 0.5 percent of its mass when shut off.", verification: "Test" },
  { id: "R-04", requirement: "Maintain predictable underwater handling.", verification: "Demonstration" },
  { id: "R-05", requirement: "Be controlled by an operator from an offboard computer through a tethered communications link.", verification: "Demonstration" },
  { id: "R-06", requirement: "Include a clear and accessible kill switch at the stern. Propulsion must not turn back on when the kill switch is deactivated after use.", verification: "Test" },
  { id: "R-07", requirement: "Passively maintain stable roll and pitch during normal operation.", verification: "Analysis and test" },
  { id: "R-08", requirement: "Be battery operated.", verification: "Inspection" },
  { id: "R-09", requirement: "Have variable propulsion control to adjust the acceleration and velocity of the vehicle.", verification: "Demonstration" },
  { id: "R-10", requirement: "Allow major components to be accessed or replaced without requiring redesign.", verification: "Inspection" },
  { id: "R-11", requirement: "Provide sufficient provisions for the future integration of upgrades and competition specific mechanisms.", verification: "Inspection" },
];

export const keyFigures = [
  { value: "3", label: "Controlled degrees of freedom" },
  { value: "2.1 m", label: "Housing depth rating" },
  { value: "0.5%", label: "Neutral buoyancy tolerance" },
  { value: "11", label: "Traceable requirements" },
];

export const capabilities = [
  {
    title: "Controlled movement",
    desc: "Surge and yaw under variable propulsion control, with heave handled through buoyancy control.",
  },
  {
    title: "Passive stability",
    desc: "Roll and pitch stay stable on their own, so the vehicle handles predictably in the water.",
  },
  {
    title: "Tethered control",
    desc: "An operator drives the vehicle from an offboard computer over a tethered communications link.",
  },
  {
    title: "Built to grow",
    desc: "Room for onboard computing such as an NVIDIA Jetson, plus sensors, cameras, grabbers and torpedoes.",
  },
];

export const safety = [
  "A clearly accessible propulsion kill switch at the stern",
  "Electrical isolation",
  "Water ingress detection inside the electronics enclosures",
  "Battery monitoring",
];

export const nextUp = [
  "Autonomous navigation",
  "Computer vision and object recognition",
  "Acoustic localisation",
  "RoboSub task mechanisms",
  "Torpedo systems",
  "Untethered operation",
];
