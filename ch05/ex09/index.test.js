import { tryParseJson } from "./index.js";

describe("tryParseJson", () => {
  it("should return success true and parsed data for valid JSON", () => {
    const jsonString = '{"name": "John", "age": 30}';
    const result = tryParseJson(jsonString);
    expect(result).toEqual({
      success: true,
      data: { name: "John", age: 30 },
    });
  });

  it("should return success false and error for invalid JSON", () => {
    const jsonString = '{"name": "John", "age": 30'; // }を入れていない
    const result = tryParseJson(jsonString);
    expect(result).toEqual({
      success: false,
      error: expect.any(SyntaxError),
    });
  });
});
