import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "foad.dev",
  description: "Personal site and portfolio of Dan Foad",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
