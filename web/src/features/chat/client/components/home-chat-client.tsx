"use client";

import { AI_FEATURES_ENABLED } from "@/config/ai-features";
import type { DifficultyLevelEnum } from "@/features/bill-difficulty/shared/types";
import { ChatButton } from "./chat-button";

interface HomeChatClientProps {
  currentDifficulty: DifficultyLevelEnum;
  bills: Array<{
    id: string;
    name: string;
    summary?: string;
    tags?: string[];
    isFeatured?: boolean;
  }>;
}

/**
 * トップページ用のチャット機能を提供するコンポーネント
 */
export function HomeChatClient({
  currentDifficulty,
  bills,
}: HomeChatClientProps) {
  if (!AI_FEATURES_ENABLED) {
    return null;
  }

  return (
    <ChatButton
      difficultyLevel={currentDifficulty}
      pageContext={{
        type: "home",
        bills,
      }}
    />
  );
}
