import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AgentGate — Make Your Website AI-Agent Ready",
  description: "The platform that turns any website into an AI-agent-compatible tool. One script tag. Instant WebMCP compliance. Get discovered by AI agents.",
  keywords: ["WebMCP", "AI agents", "web standard", "AI-ready websites", "agent tools"],
  openGraph: {
    title: "AgentGate — Make Your Website AI-Agent Ready",
    description: "One script tag turns your website into a tool that AI agents can use. Be discovered. Be automated. Be first.",
    type: "website",
  },
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
