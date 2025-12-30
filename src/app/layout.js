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

export const metadata = {
  title: "DevDuel - The Ultimate Coding Battle Platform",
  description: "Join DevDuel to practice coding, compete in real-time battles, and master algorithms in Python, JavaScript, and C++.",
  keywords: ["coding challenges", "dev duel", "programming battles", "learn python", "learn javascript", "coding interview prep"],
  icons: {
    icon: "/devduel.jpg",
    apple: "/devduel.jpg",
  },
  openGraph: {
    images: ["/devduel.jpg"],
    title: "DevDuel - The Ultimate Coding Battle Platform",
    description: "Battle real players, solve complex algorithms, and level up your development skills.",
    url: "https://devduel.com",
    siteName: "DevDuel",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
