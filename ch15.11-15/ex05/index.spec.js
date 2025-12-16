import { expect, test } from "@playwright/test";

/**
 * @param {import("@playwright/test").Page} page
 * @param {string} todo
 */
async function addToDo(page, todo) {
  await page.getByRole("textbox").fill(todo);
  await page.getByRole("button", { name: "Add" }).click();
}

/**
 * @param {import("@playwright/test").Page} page
 * @param {number} index
 */
async function checkToDo(page, index) {
  await page.getByRole("listitem").nth(index).getByRole("checkbox").check();
}

/**
 * @param {import("@playwright/test").Page} page
 * @param {number} index
 */
async function deleteToDo(page, index) {
  await page
    .getByRole("listitem")
    .nth(index)
    .getByRole("button", { name: "❌" })
    .click();
}

/**
 * @param {import("@playwright/test").Page} page
 */
async function countToDos(page) {
  return await page.getByRole("listitem").count();
}

/**
 * @param {import("@playwright/test").Page} page
 * @param {number} index
 */
function queryToDo(page, index) {
  return page.getByRole("listitem").nth(index);
}

test.describe("simple todo app with IndexedDB", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/ch15.11-15/ex05");
    // テスト前にIndexedDBをクリアする
    await page.evaluate(async () => {
      const req = indexedDB.deleteDatabase("todo-db");
      return new Promise((resolve, reject) => {
        req.onsuccess = resolve;
        req.onerror = reject;
        req.onblocked = resolve;
      });
    });
    // クリア後にリロードしてDBを再作成させる
    await page.reload();
  });

  test("no default todos", async ({ page }) => {
    expect(await countToDos(page)).toBe(0);
  });

  test("add new todo", async ({ page }) => {
    await addToDo(page, "質問表に質問を記載する");

    await expect(page.getByRole("listitem")).toHaveCount(1);

    const todo = queryToDo(page, 0);
    const label = todo.getByText("質問表に質問を記載する");
    await expect(label).toBeVisible();
    await expect(label).toHaveCSS("text-decoration-line", "none");
  });

  test("add multiple todos", async ({ page }) => {
    await addToDo(page, "質問表に質問を記載する");
    await addToDo(page, "練習問題を完了する");

    await expect(page.getByRole("listitem")).toHaveCount(2);

    // 順序は実装依存だが、通常は追加順またはID順
    // ここでは要素が存在することを確認
    await expect(page.getByText("質問表に質問を記載する")).toBeVisible();
    await expect(page.getByText("練習問題を完了する")).toBeVisible();
  });

  test("delete todo", async ({ page }) => {
    await addToDo(page, "質問表に質問を記載する");
    await deleteToDo(page, 0);

    await expect(page.getByRole("listitem")).toHaveCount(0);
  });

  test("complete todo", async ({ page }) => {
    await addToDo(page, "質問表に質問を記載する");
    await checkToDo(page, 0);

    await expect(page.getByRole("listitem")).toHaveCount(1);

    const todo = queryToDo(page, 0);
    const label = todo.getByText("質問表に質問を記載する");
    await expect(label).toHaveCSS("text-decoration-line", "line-through");
  });

  test("persist todos after reload", async ({ page }) => {
    await addToDo(page, "リロードテスト");
    await checkToDo(page, 0); // 完了状態にする

    await page.waitForTimeout(500);

    await expect(page.getByRole("listitem")).toHaveCount(1);

    await page.reload();

    // リロード後もデータが残っているか
    await expect(page.getByRole("listitem")).toHaveCount(1);
    const todo = queryToDo(page, 0);
    const label = todo.getByText("リロードテスト");
    await expect(label).toBeVisible();
    await expect(label).toHaveCSS("text-decoration-line", "line-through");
  });
});

test.describe("simple todo app on multi tab (IndexedDB)", () => {
  test("sync todos between tabs automatically", async ({ browser }) => {
    const context = await browser.newContext();

    // 1つ目のタブを開く
    const pageA = await context.newPage();
    await pageA.goto("/ch15.11-15/ex05");

    // DBクリア
    await pageA.evaluate(async () => {
      const req = indexedDB.deleteDatabase("todo-db");
      return new Promise((resolve) => {
        req.onsuccess = resolve;
        req.onerror = resolve;
        req.onblocked = resolve;
      });
    });
    await pageA.reload();

    // 2つ目のタブを開く
    const pageB = await context.newPage();
    await pageB.goto("/ch15.11-15/ex05");

    // タブAでToDoを追加
    await addToDo(pageA, "Sync Test Task");

    // タブBに自動的に反映されているか確認 (リロードなし)
    // BroadcastChannelの反映にはわずかなラグがあるため waitFor を使う
    await expect(async () => {
      expect(await countToDos(pageB)).toBe(1);
    }).toPass();

    const labelB = queryToDo(pageB, 0).getByText("Sync Test Task");
    await expect(labelB).toBeVisible();

    // タブBで完了状態にする
    await checkToDo(pageB, 0);

    // タブAに自動的に反映されているか確認
    await expect(async () => {
      const labelA = queryToDo(pageA, 0).getByText("Sync Test Task");
      await expect(labelA).toHaveCSS("text-decoration-line", "line-through");
    }).toPass();

    // タブAで削除
    await deleteToDo(pageA, 0);

    // タブBから消えているか確認
    await expect(async () => {
      expect(await countToDos(pageB)).toBe(0);
    }).toPass();
  });
});
