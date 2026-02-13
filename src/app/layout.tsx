import type { Metadata } from "next";
import Script from "next/script";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import "./globals.css";

const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-V7J2YJFE05";

export const metadata: Metadata = {
  title: "AgentGate — Make Your Website AI-Agent Ready",
  description: "The platform that turns any website into an AI-agent-compatible tool. One script tag. Instant WebMCP compliance. Get discovered by AI agents.",
  keywords: ["WebMCP", "AI agents", "web standard", "AI-ready websites", "agent tools", "AgentGate"],
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "32x32" },
    ],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "AgentGate — Make Your Website AI-Agent Ready",
    description: "One script tag turns your website into a tool that AI agents can use. Be discovered. Be automated. Be first.",
    type: "website",
    url: "https://getagentgate.com",
    siteName: "AgentGate",
  },
  twitter: {
    card: "summary_large_image",
    title: "AgentGate — Make Your Website AI-Agent Ready",
    description: "One script tag turns your website into a tool that AI agents can use.",
  },
  metadataBase: new URL("https://getagentgate.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            window.gtag = gtag;
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>
        <GoogleAnalytics measurementId={GA_MEASUREMENT_ID} />
        {children}
      </body>
    </html>
  );
}
