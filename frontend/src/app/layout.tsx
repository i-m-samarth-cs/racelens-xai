import type { Metadata } from "next";
import { Inter, Orbitron } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const orbitron = Orbitron({ 
  subsets: ["latin"],
  variable: "--font-orbitron",
  display: "swap",
});

export const metadata: Metadata = {
  title: "RaceLens XAI - Explainable Motorsport Intelligence",
  description: "Explainable motorsport intelligence for race control, engineers, analysts, and fans. Powered by IBM Granite, Docling, and Langflow.",
  keywords: ["motorsport", "AI", "explainable AI", "race strategy", "telemetry", "FIA", "racing"],
  authors: [{ name: "RaceLens XAI Team" }],
  openGraph: {
    title: "RaceLens XAI - Explainable Motorsport Intelligence",
    description: "When every millisecond matters, trust the reason behind the decision.",
    type: "website",
    images: [
      {
        url: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=1200&h=630&fit=crop",
        width: 1200,
        height: 630,
        alt: "RaceLens XAI",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "RaceLens XAI - Explainable Motorsport Intelligence",
    description: "When every millisecond matters, trust the reason behind the decision.",
    images: ["https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=1200&h=630&fit=crop"],
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
  themeColor: "#E63946",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${orbitron.variable}`}>
      <body className="min-h-screen">
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: "#1A1F2E",
              color: "#E5E7EB",
              border: "1px solid #374151",
            },
            success: {
              iconTheme: {
                primary: "#06FFA5",
                secondary: "#1A1F2E",
              },
            },
            error: {
              iconTheme: {
                primary: "#E63946",
                secondary: "#1A1F2E",
              },
            },
          }}
        />
      </body>
    </html>
  );
}

// Made with Bob
