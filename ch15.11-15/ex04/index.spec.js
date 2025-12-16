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

test.describe("simple todo app", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/ch15.11-15/ex04");
    // localStorageをクリアしてテストの独立性を保つ
    await page.evaluate(() => localStorage.clear());
  });

  test("no default todos", async ({ page }) => {
    expect(await countToDos(page)).toBe(0);
  });

  test("add new todo", async ({ page }) => {
    await addToDo(page, "質問表に質問を記載する");

    expect(await countToDos(page)).toBe(1);

    const todo = queryToDo(page, 0);
    const label = todo.getByText("質問表に質問を記載する");
    await expect(label).toBeVisible();
    await expect(label).toHaveCSS("text-decoration-line", "none");
  });

  test("add multiple todos", async ({ page }) => {
    await addToDo(page, "質問表に質問を記載する");
    await addToDo(page, "練習問題を完了する");

    expect(await countToDos(page)).toBe(2);

    const todo1 = queryToDo(page, 0);
    const label1 = todo1.getByText("質問表に質問を記載する");
    await expect(label1).toBeVisible();
    await expect(label1).toHaveCSS("text-decoration-line", "none");

    const todo2 = queryToDo(page, 1);
    const label2 = todo2.getByText("練習問題を完了する");
    await expect(label2).toBeVisible();
    await expect(label2).toHaveCSS("text-decoration-line", "none");
  });

  test("delete todo", async ({ page }) => {
    await addToDo(page, "質問表に質問を記載する");
    await addToDo(page, "練習問題を完了する");
    await deleteToDo(page, 0);

    expect(await countToDos(page)).toBe(1);

    const todo = queryToDo(page, 0);
    const label = todo.getByText("練習問題を完了する");
    await expect(label).toBeVisible();
    await expect(label).toHaveCSS("text-decoration-line", "none");
  });

  test("complete todo", async ({ page }) => {
    await addToDo(page, "質問表に質問を記載する");
    await addToDo(page, "練習問題を完了する");
    await checkToDo(page, 1);

    expect(await countToDos(page)).toBe(2);

    const todo1 = queryToDo(page, 0);
    const label1 = todo1.getByText("質問表に質問を記載する");
    await expect(label1).toBeVisible();
    await expect(label1).toHaveCSS("text-decoration-line", "none");

    const todo2 = queryToDo(page, 1);
    const label2 = todo2.getByText("練習問題を完了する");
    await expect(label2).toBeVisible();
    await expect(label2).toHaveCSS("text-decoration-line", "line-through");
  });

  test("add new todo and reload", async ({ page }) => {
    await addToDo(page, "質問表に質問を記載する");
    expect(await countToDos(page)).toBe(1);

    await page.reload();
    expect(await countToDos(page)).toBe(1);

    const todo = queryToDo(page, 0);
    const label = todo.getByText("質問表に質問を記載する");
    await expect(label).toBeVisible();
    await expect(label).toHaveCSS("text-decoration-line", "none");
  });
});

test.describe("simple todo app on multi tab", () => {
  test("sync todos between tabs", async ({ browser }) => {
    const context = await browser.newContext();
    const pageA = await context.newPage();
    await pageA.goto("/ch15.11-15/ex04");
    await pageA.evaluate(() => localStorage.clear());

    const pageB = await context.newPage();
    await pageB.goto("/ch15.11-15/ex04");

    await addToDo(pageA, "Aのタスク1");
    await addToDo(pageA, "Aのタスク2");
    await checkToDo(pageA, 1);

    // 他タブに切り替えて同期を確認
    await pageB.reload();
    expect(await countToDos(pageB)).toBe(2);

    const todo1 = queryToDo(pageB, 0);
    const label1 = todo1.getByText("Aのタスク1");
    await expect(label1).toBeVisible();
    await expect(label1).toHaveCSS("text-decoration-line", "none");

    const todo2 = queryToDo(pageB, 1);
    const label2 = todo2.getByText("Aのタスク2");
    await expect(label2).toBeVisible();
    await expect(label2).toHaveCSS("text-decoration-line", "line-through");
  });

  test("localStorage disabled: no error and works in tab", async ({
    browser,
  }) => {
    const context = await browser.newContext({
      permissions: [],
      storageState: undefined,
    });
    const page = await context.newPage();
    await page.goto("/ch15.11-15/ex04");

    // localStorageを無効化
    await page.addInitScript(() => {
      Object.defineProperty(window, "localStorage", {
        configurable: true,
        get() {
          throw new Error("localStorage is disabled");
        },
      });
    });

    // ToDo追加・削除・完了がエラーなく動作すること
    await addToDo(page, "localStorage禁止テスト");
    expect(await countToDos(page)).toBe(1);

    await checkToDo(page, 0);
    await deleteToDo(page, 0);
    expect(await countToDos(page)).toBe(0);
  });
});
