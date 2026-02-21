import type { Metadata } from "next";
import { Rajdhani, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const rajdhani = Rajdhani({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "KOMEQ | Advanced Self-Balancing Hardware",
  description: "KOMEQ is a revolutionary large-scale self-balancing product powered by an Arduino microcontroller, PID control, and IMU sensor fusion. Designed by Sahil Mane.",
  keywords: [
    "Komeq", "komeq", "KOMEQ", "self-balancing", "self-balancing robot",
    "Arduino project", "IMU sensor fusion", "PID control",
    "reaction wheels", "Sahil Mane", "hardware engineering", "robotics"
  ],
  authors: [{ name: "Sahil Mane", url: "https://sahilmane-one.vercel.app" }],
  creator: "Sahil Mane",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "KOMEQ | Advanced Self-Balancing Hardware",
    description: "KOMEQ is a revolutionary large-scale self-balancing product powered by an Arduino microcontroller and IMU sensor fusion. Built for perfect stability.",
    siteName: "KOMEQ",
    images: [
      {
        url: "/image.png",
        width: 1200,
        height: 630,
        alt: "KOMEQ Self Balancing System",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "KOMEQ | Advanced Self-Balancing Hardware",
    description: "Physics-defying 0.05ms balance latency powered by Arduino & IMU sensors.",
    images: ["/image.png"],
  },
  icons: {
    icon: "/image.png",
    shortcut: "/image.png",
    apple: "/image.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${rajdhani.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
