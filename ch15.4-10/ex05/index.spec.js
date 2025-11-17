import { test, expect } from "@playwright/test";

test.describe("inline-circle custom element", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/ch15.4-10/ex05/index.html");
  });

  test("should render with default border color (black)", async ({ page }) => {
    const circle = await page.locator("inline-circle").first();
    const borderColor = await circle.evaluate(
      (el) => getComputedStyle(el).borderColor
    );
    expect(borderColor).toBe("rgb(0, 0, 0)");
  });

  test("should reflect border-color attribute on initial render", async ({
    page,
  }) => {
    const redCircle = await page.locator('inline-circle[border-color="red"]');
    const borderColor = await redCircle.evaluate(
      (el) => getComputedStyle(el).borderColor
    );
    expect(borderColor).toBe("rgb(255, 0, 0)");
  });

  test("should update border color when attribute changes", async ({
    page,
  }) => {
    const circle = await page.locator("inline-circle").first();
    await circle.evaluate((el) => el.setAttribute("border-color", "blue"));
    const borderColor = await circle.evaluate(
      (el) => getComputedStyle(el).borderColor
    );
    expect(borderColor).toBe("rgb(0, 0, 255)");
  });
});
