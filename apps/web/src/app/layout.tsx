import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "../index.css";

const space_grotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Clash",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${space_grotesk.className} antialiased w-full h-full`}>
        <main className="h-full w-full relative">{children}</main>
      </body>
    </html>
  );
}
