import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AK Shoe Store - Best shoes, Best Prices",
  description:
    "AK Shoe Store is Australia's preferred retailer of biggest sports brands at the best prices",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  console.log("Main Layout");

  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
