import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import "./globals.css";

export const metadata: Metadata = {
  title: "MVPXiv",
  description:
    "Startup-grade project blueprints from cutting-edge ML research, generated daily from arXiv.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-black">
        <Header />
        {children}
      </body>
    </html>
  );
}
