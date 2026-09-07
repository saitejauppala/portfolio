import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sai Teja Uppala | Cybersecurity & Software Developer",
  description:
    "Portfolio of Sai Teja Uppala — an aspiring cybersecurity and software development professional skilled in Java, Python, AWS, and cybersecurity fundamentals.",
  keywords: [
    "Sai Teja Uppala",
    "cybersecurity",
    "software developer",
    "Java",
    "Python",
    "AWS",
    "portfolio",
  ],
  openGraph: {
    title: "Sai Teja Uppala | Cybersecurity & Software Developer",
    description:
      "Portfolio of Sai Teja Uppala — aspiring cybersecurity and software development professional.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sai Teja Uppala | Cybersecurity & Software Developer",
    description:
      "Portfolio of Sai Teja Uppala — aspiring cybersecurity and software development professional.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}