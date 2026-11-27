import type { BreadcrumbItem } from "@/components/ui/breadcrumb";
import { routes, SESSION_ARCHIVE_LABEL } from "@/lib/routes";

/** 会期まとめページのパンくず項目（TOP > 会期ごとのまとめ > 会期のまとめ の 3 段） */
export function buildSessionSummaryBreadcrumbItems(
  sessionName: string
): BreadcrumbItem[] {
  return [
    { label: "TOP", href: routes.home() },
    { label: SESSION_ARCHIVE_LABEL, href: routes.sessionArchive() },
    { label: `${sessionName}のまとめ` },
  ];
}
