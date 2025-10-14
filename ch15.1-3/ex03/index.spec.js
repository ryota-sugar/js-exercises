import { test, expect } from "@playwright/test";

test("script with correct integrity loads", async ({ page }) => {
  const logs = [];
  page.on("console", (msg) => logs.push(msg.text()));
  await page.goto("http://localhost:3000/ch15.1-3/ex03/index.html");
  await page.waitForTimeout(500); // 実行を待つ
  expect(logs).toContain("index1");
});

test("script with incorrect integrity does not load", async ({ page }) => {
  const logs = [];
  page.on("console", (msg) => logs.push(msg.text()));
  await page.goto("http://localhost:3000/ch15.1-3/ex03/index.html");
  await page.waitForTimeout(500);
  expect(logs).not.toContain("index2");
});
