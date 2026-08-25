import type { Metadata, Viewport } from "next";
import { site } from "@/content/site";

/* Self-hosted brand fonts — no Google Fonts request at runtime or build time.
   Display: Cormorant Garamond · Interface: Jost (variable) */
import "@fontsource/cormorant-garamond/300.css";
import "@fontsource/cormorant-garamond/400.css";
import "@fontsource/cormorant-garamond/400-italic.css";
import "@fontsource/cormorant-garamond/500.css";
import "@fontsource/cormorant-garamond/600.css";
import "@fontsource-variable/jost";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://tamannashrestha.com"),
  title: {
    default: `${site.name} — ${site.role}`,
    template: `%s · ${site.name}`,
  },
  description:
    "Editorial, campaign and runway portfolio of Tamanna Shrestha — model and fashion creator based in Kathmandu, available worldwide.",
  keywords: [
    "Tamanna Shrestha",
    "model portfolio",
    "fashion model Nepal",
    "editorial",
    "campaign",
    "runway",
    "Kathmandu",
  ],
  openGraph: {
    title: `${site.name} — ${site.role}`,
    description:
      "Editorial, campaign and runway portfolio. Based in Kathmandu, available worldwide.",
    url: "https://tamannashrestha.com",
    siteName: site.name,
    images: [{ url: "/media/poster.jpg", width: 1920, height: 1080 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.role}`,
    description: "Model & fashion creator. Editorial, campaign, runway.",
    images: ["/media/poster.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0c",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="bg-ink text-cream antialiased">{children}</body>
    </html>
  );
}
