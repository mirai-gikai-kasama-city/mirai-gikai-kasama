import { describe, expect, it } from "vitest";
import { isAiFeaturePath } from "./ai-features";

describe("isAiFeaturePath", () => {
  it.each([
    "/api/chat",
    "/api/interview/chat",
    "/api/interview/complete",
    "/api/bills/abc/topic-analysis",
    "/api/og/report",
    "/bills/abc/interview",
    "/bills/abc/interview/chat",
    "/bills/abc/interview/disclosure",
    "/preview/bills/abc/interview/chat",
    "/bills/abc/topics",
    "/bills/abc/topics/topic-1",
    "/bills/abc/opinions",
    "/report/abc",
    "/report/abc/chat-log",
  ])("%s はAI機能として止める", (pathname) => {
    expect(isAiFeaturePath(pathname)).toBe(true);
  });

  it.each([
    "/",
    "/bills/abc",
    "/preview/bills/abc",
    "/sessions",
    "/members",
    "/search",
    "/privacy",
    "/api/og/bills/abc",
    "/api/revalidate",
    "/bills/interview-guide",
    "/reports",
  ])("%s は止めない", (pathname) => {
    expect(isAiFeaturePath(pathname)).toBe(false);
  });
});
