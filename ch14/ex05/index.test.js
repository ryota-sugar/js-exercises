import { template } from "./index.js";

describe("template", () => {
  test("empty template", () => {
    expect(template``).toBe("");
  });

  test("template with only string", () => {
    expect(template`test`).toBe("test");
  });

  test("template with one string value", () => {
    expect(template`Hello, ${"A"}`).toBe("Hello, string");
  });

  test("template with multiple types", () => {
    expect(template`${1} ${null} ${() => {}}`).toBe("number object function");
  });

  test("template with description and value", () => {
    expect(template`type of 'A' is ${"A"}`).toBe("type of 'A' is string");
  });
});
