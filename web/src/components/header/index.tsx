import { getAllDietSessions } from "@/features/diet-sessions/server/loaders/get-all-diet-sessions";
import { HeaderClient, type HeaderSessionLink } from "./header-client";

/**
 * ナビの会期一覧（SESSION_ARCHIVE_LABEL）のメニューに並べる会期（新しい順）。
 * ヘッダーは全ページに出るので、取得に失敗しても一覧へのリンクだけで表示を続ける
 */
async function loadSessionLinks(): Promise<HeaderSessionLink[]> {
  try {
    const sessions = await getAllDietSessions();
    return sessions.map(({ id, name }) => ({ id, name }));
  } catch (error) {
    console.error("ヘッダーの会期一覧を取得できませんでした", error);
    return [];
  }
}

export async function Header() {
  return <HeaderClient sessions={await loadSessionLinks()} />;
}
