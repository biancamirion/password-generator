import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Password Generator",
  description: "Password Generator app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body data-gramm="false">{children}</body>
    </html>
  );
}
