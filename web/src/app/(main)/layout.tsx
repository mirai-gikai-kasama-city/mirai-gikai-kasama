import { GoogleAnalytics } from "@next/third-parties/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { ReactNode } from "react";
import { Header } from "@/components/header";
import { AuthGate } from "@/components/layouts/auth-gate";
import { Footer } from "@/components/layouts/footer/footer";
import { MainContent } from "@/components/layouts/main-content";
import { MainLayout } from "@/components/layouts/main-layout";
import { OperatorContact } from "@/components/layouts/operator-contact";
import { env } from "@/lib/env";
import { RubyfulInitializer } from "@/lib/rubyful";

export default function MainGroupLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <>
      <SpeedInsights />
      <GoogleAnalytics gaId={env.analytics.gaTrackingId ?? ""} />
      <RubyfulInitializer />
      <AuthGate />

      <MainLayout>
        <Header />
        <MainContent>{children}</MainContent>
        <Footer />
        {/* 右下の連絡先の枠に、ページ末尾の文字が隠れないための余白 */}
        <div aria-hidden className="h-16 md:h-20" />
      </MainLayout>
      <OperatorContact />
    </>
  );
}
