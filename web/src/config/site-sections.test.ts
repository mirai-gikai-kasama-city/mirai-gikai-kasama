import { describe, expect, it } from "vitest";
import { isHiddenSectionPath } from "./site-sections";

describe("isHiddenSectionPath", () => {
  it.each([
    "/mayor",
    "/elections",
    "/attendance",
    "/committees",
    "/committees/group/abc",
    "/committees/abc",
    "/petitions",
    "/members",
    "/members/%E7%94%B0%E6%9D%91",
    "/proposers/mayor",
  ])("%s は公開しない", (pathname) => {
    expect(isHiddenSectionPath(pathname)).toBe(true);
  });

  it.each([
    "/",
    "/bills/abc",
    "/sessions",
    "/sessions/abc",
    "/archive",
    "/search",
    "/tags/abc",
    "/questions",
    "/questions/kasama-r8-3-teirei",
    "/sources",
    "/terms",
    "/privacy",
    "/mayors-note",
  ])("%s は公開する", (pathname) => {
    expect(isHiddenSectionPath(pathname)).toBe(false);
  });
});
