import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import Footer from "@/components/Footer";
import BackToTop from "@/components/ui/BackToTop"
import ScrollToTextHandler from "@/components/ScrollToTextHandler";
import "./globals.css";

const jetbrains = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-jetbrains" });

export const metadata: Metadata = {
  title: "ANU Exploration Robotics",
  description:
    "ANU Exploration Robotics - a student team building robots to explore and survey the world around us, starting with an autonomous underwater vehicle.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${jetbrains.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <ScrollToTextHandler />
        <main className="flex-1">{children}</main>
        <Footer />
        <BackToTop />
      </body>
    </html>
  );
}
