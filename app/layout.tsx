import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LUMA//VOID",
  description:
    "A free, open-source visual digital garden for ideas, notes, and connections.",
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
