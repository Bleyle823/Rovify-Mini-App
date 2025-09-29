import "./theme.css";
import "@coinbase/onchainkit/styles.css";
import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Providers } from "./providers";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export async function generateMetadata(): Promise<Metadata> {
  const URL = 'https://rovify.vercel.app';
  return {
    title: "Rovify Mini - Discover Amazing Events",
    description:
      "Discover and explore amazing events, connect with creators, and manage your profile with Rovify Mini. Built on Base with OnchainKit.",
    other: {
      "fc:frame": JSON.stringify({
        version: "next",
        imageUrl: `${URL}/hero.png`,
        button: {
          title: "Launch Rovify Mini",
          action: {
            type: "launch_frame",
            name: "Rovify Mini",
            url: URL,
            splashImageUrl: `${URL}/splash.png`,
            splashBackgroundColor: "#0f0f0f",
          },
        },
      }),
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-background">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
