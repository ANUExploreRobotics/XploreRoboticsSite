import type { Metadata } from "next";
import Footer from "@/components/Footer";
import BackToTop from "@/components/ui/BackToTop"
import ScrollToTextHandler from "@/components/ScrollToTextHandler";
import "./globals.css";

export const metadata: Metadata = {
  title: "ANU Exploration Robotics",
  description:
    "ANU Exploration Robotics - RoboSub team building an autonomous underwater vehicle.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <ScrollToTextHandler />
        <main className="flex-1">{children}</main>
        <Footer />
        <BackToTop />
      </body>
    </html>
  );
}
