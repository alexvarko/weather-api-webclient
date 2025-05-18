import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Weather Updates App",
  description: "Weather API Web Client",
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
