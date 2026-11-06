import Image from "next/image";
import { Container } from "@/components/layouts/container";

export function Hero() {
  return (
    <div className="w-full bg-mirai-surface-key md:rounded-lg">
      {/* md未満は固定ヘッダー（2段）に見出しが隠れないよう
          ヘッダー高ぶんの上余白を確保する。md以上はmain-layoutのmtが効く */}
      <div className="relative overflow-hidden pt-36 pb-12 md:pt-14 md:pb-16">
        {/* 丘の連なりの背景画像（装飾）。空の部分が見出しの後ろに来るよう上端にそろえる */}
        <Image
          src="/img/hero_background.png"
          alt=""
          aria-hidden
          fill
          priority
          sizes="(min-width: 768px) 700px, 100vw"
          className="pointer-events-none object-cover object-top"
        />
        <Container>
          <div className="relative flex flex-col gap-4">
            {/* 文節単位のinline-blockで、拡大フォント環境でも語の途中で折り返さないようにする */}
            <h1 className="font-bold text-2xl md:text-3xl leading-relaxed text-mirai-text">
              <span className="inline-block">笠間市議会で</span>
              <span className="inline-block">議論されてきたこと、</span>
              <br />
              <span className="inline-block">今まさに</span>
              <span className="inline-block">議論していること、</span>
              <br />
              <span className="inline-block">を整理して説明します</span>
            </h1>
            <p className="max-w-[420px] text-sm leading-relaxed text-mirai-text-secondary md:text-base">
              議案の要点をAIが整理してお届けします。議案の検索や、会期ごとのまとめもご覧いただけます。
            </p>
          </div>
        </Container>
      </div>
    </div>
  );
}
