import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:3000/ch15.1-3/ex14/index.html");
});

test.describe("Filtering function of product list", () => {
  test("All products are displayed initially", async ({ page }) => {
    await expect(page.getByTestId("food1")).toBeVisible();
    await expect(page.getByTestId("stationery1")).toBeVisible();
    await expect(page.getByTestId("stationery2")).toBeVisible();
  });

  test("Only food is displayed when 'Food' is selected", async ({ page }) => {
    // 「食品」を選択
    await page.getByTestId("select").selectOption("food");

    // 食品が表示され、文房具が非表示になっていることのチェック
    await expect(page.getByTestId("food1")).toBeVisible();
    await expect(page.getByTestId("stationery1")).toBeHidden();
    await expect(page.getByTestId("stationery2")).toBeHidden();
  });

  test("Only stationery is displayed when 'Stationery' is selected", async ({
    page,
  }) => {
    // 「文房具」を選択
    await page.getByTestId("select").selectOption("stationery");

    // 文房具が表示され、食品が非表示になっていることのチェック
    await expect(page.getByTestId("food1")).toBeHidden();
    await expect(page.getByTestId("stationery1")).toBeVisible();
    await expect(page.getByTestId("stationery2")).toBeVisible();
  });

  test("All products are displayed again when 'All' is selected", async ({
    page,
  }) => {
    // 「食品」を選択して「文房具」が非表示になっていることをチェック
    await page.getByTestId("select").selectOption("food");
    await expect(page.getByTestId("stationery1")).toBeHidden(); // 非表示になったことを確認

    // 「すべて」を選択
    await page.getByTestId("select").selectOption("all");

    // 再度全ての商品が表示されることのチェック
    await expect(page.getByTestId("food1")).toBeVisible();
    await expect(page.getByTestId("stationery1")).toBeVisible();
    await expect(page.getByTestId("stationery2")).toBeVisible();
  });
});
