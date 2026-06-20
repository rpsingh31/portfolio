import type { Metadata } from "next";
import { Bricolage_Grotesque, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700", "800"],
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Rudra Pratap Singh · AI Engineer & Full-Stack Developer",
  description:
    "Rudra Pratap Singh, AI Engineer and Full-Stack Developer. Lead Engineer at Milk Inc, building production AI and hyperspectral systems. MS in Mathematics & Computing, IIT Roorkee.",
  authors: [{ name: "Rudra Pratap Singh" }],
  openGraph: {
    type: "website",
    title: "Rudra Pratap Singh · AI Engineer & Full-Stack Developer",
    description:
      "Lead Engineer at Milk Inc. I build production AI systems and real-time full-stack products, working across the spectrum from hyperspectral imaging to LLM systems.",
  },
  twitter: { card: "summary_large_image", creator: "@r_psingh31" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${mono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
