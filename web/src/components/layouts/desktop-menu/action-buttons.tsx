import { ArrowRight } from "lucide-react";
import type { Route } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { routes } from "@/lib/routes";

/**
 * デスクトップメニュー: アクションボタン（サイドバー内）
 */
export function DesktopMenuActionButtons() {
  return (
    <div className="flex flex-col gap-3">
      <Button asChild variant="outline" className="w-fit px-6 py-3 h-auto">
        <Link href={`${routes.home()}#about` as Route}>
          <Image
            src="/icons/info-icon.svg"
            alt=""
            width={20}
            height={20}
            className="flex-shrink-0"
          />
          <span className="text-[15px] font-bold">みらい議会とは</span>
          <ArrowRight aria-hidden className="size-4 flex-shrink-0" />
        </Link>
      </Button>
    </div>
  );
}
