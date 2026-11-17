import { OPERATOR_EMAIL, OPERATOR_FULL_NAME } from "@/lib/seo/operator-json-ld";

/**
 * 画面右下に常に出す運営者の連絡先。
 * 選挙運動にウェブサイトを使う者は電子メールアドレス等を表示する決まりがある
 * （公職選挙法第142条の3第3項）ため、どのページでも、スクロールしても見えるよう固定する。
 * 折りたたまずに常に文字で出す
 */
export function OperatorContact() {
  return (
    <aside
      aria-label="運営者の連絡先"
      className="fixed right-3 bottom-3 z-40 max-w-[calc(100vw-24px)] rounded-lg border border-mirai-border bg-white/95 px-3 py-2 text-[11px] leading-[1.6] text-mirai-text shadow-md md:right-5 md:bottom-5 md:text-xs"
    >
      <p>運営者：{OPERATOR_FULL_NAME}</p>
      <p>
        連絡先：
        <a
          href={`mailto:${OPERATOR_EMAIL}`}
          className="break-all text-primary-accent underline underline-offset-2"
        >
          {OPERATOR_EMAIL}
        </a>
      </p>
    </aside>
  );
}
