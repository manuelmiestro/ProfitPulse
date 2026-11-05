import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Instrument_Serif } from "next/font/google";
import { Providers } from "@/components/Providers";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-instrument",
  display: "swap",
});

export const metadata: Metadata = {
  title: "MyProfitPulse - CEO Dashboard for Service-Based Businesses",
  description:
    "Finally understand your numbers—without the accounting degree. Financial clarity for service-based business owners.",
  icons: {
    icon: "/favicon-512.png",
    apple: "/favicon-512.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${jakarta.variable} ${instrumentSerif.variable}`}>
      <body className="font-sans antialiased">
        <Providers>{children}</Providers>
        <div
          role="note"
          className="fixed bottom-3 left-1/2 -translate-x-1/2 z-[9980] rounded-full bg-[#2D2A26]/90 px-3 py-1 text-[11px] font-medium text-white shadow w-max max-w-[95vw] text-center"
        >
          Preview with fake data · nothing is saved, sent or charged ·{" "}
          <a href="/demo-persona?p=sample" className="underline">Sample months</a> ·{" "}
          <a href="/demo-persona?p=new" className="underline">New account</a>
        </div>
      </body>
    </html>
  );
}
