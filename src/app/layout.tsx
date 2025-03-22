import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Swaraj Kumar - Web Developer & Electronics Engineer",
  description: "Portfolio of Swaraj Kumar, a web developer and electronics engineer specializing in React.js, Next.js, and innovative electronic solutions.",
  keywords: ["Swaraj Kumar", "Web Developer", "Electronics Engineer", "React", "Next.js", "Portfolio"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
