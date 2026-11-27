import type { Metadata } from "next";
import { SourcesPage } from "@/features/sources/server/components/sources-page";
import { routes } from "@/lib/routes";
import { PAGE_COPY } from "@/lib/seo/page-copy";
import { buildPageShareMetadata } from "@/lib/seo/share-metadata";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: PAGE_COPY.sources.title,
  description: PAGE_COPY.sources.description,
  alternates: {
    canonical: routes.sources(),
  },
  ...buildPageShareMetadata({
    ...PAGE_COPY.sources,
    path: routes.sources(),
  }),
};

export default function SourcesRoute() {
  return <SourcesPage />;
}
