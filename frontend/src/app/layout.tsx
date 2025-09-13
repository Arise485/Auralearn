import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Auralearn - AI-Powered Learning Platform",
  description: "Revolutionary personalized learning platform with AI tutoring, study plans, and productivity tools",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
