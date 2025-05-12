import { changeEscapeSequence1, changeEscapeSequence2 } from "./index.js";

describe("changeEscapeSequence", () => {
  describe("changeEscapeSequence1", () => {
    it("should change escape sequences to their string representations", () => {
      const input = "\0\b\t\n\v\f\r\"'";
      const expected = "\\0\\b\\t\\n\\v\\f\\r\\\"\\'";
      expect(changeEscapeSequence1(input)).toBe(expected);
    });

    it("should return the same string if no escape sequences are present", () => {
      const input = "Hello, World!";
      expect(changeEscapeSequence1(input)).toBe(input);
    });

    it("should handle strings with mixed characters", () => {
      const input = "Hello\nWorld\t!";
      const expected = "Hello\\nWorld\\t!";
      expect(changeEscapeSequence1(input)).toBe(expected);
    });

    it("should handle empty strings", () => {
      const input = "";
      const expected = "";
      expect(changeEscapeSequence1(input)).toBe(expected);
    });

    it("should handle strings with only escape sequences", () => {
      const input = "\0\0\0";
      const expected = "\\0\\0\\0";
      expect(changeEscapeSequence1(input)).toBe(expected);
    });

    it("should handle strings with backslashes", () => {
      const input = "\\\\";
      const expected = "\\\\\\\\";
      expect(changeEscapeSequence1(input)).toBe(expected);
    });
  });

  describe("changeEscapeSequence2", () => {
    it("should change escape sequences to their string representations", () => {
      const input = "\0\b\t\n\v\f\r\"'";
      const expected = "\\0\\b\\t\\n\\v\\f\\r\\\"\\'";
      expect(changeEscapeSequence2(input)).toBe(expected);
    });

    it("should return the same string if no escape sequences are present", () => {
      const input = "Hello, World!";
      expect(changeEscapeSequence2(input)).toBe(input);
    });

    it("should handle strings with mixed characters", () => {
      const input = "Hello\nWorld\t!";
      const expected = "Hello\\nWorld\\t!";
      expect(changeEscapeSequence2(input)).toBe(expected);
    });

    it("should handle empty strings", () => {
      const input = "";
      const expected = "";
      expect(changeEscapeSequence2(input)).toBe(expected);
    });

    it("should handle strings with only escape sequences", () => {
      const input = "\0\0\0";
      const expected = "\\0\\0\\0";
      expect(changeEscapeSequence2(input)).toBe(expected);
    });

    it("should handle strings with backslashes", () => {
      const input = "\\\\";
      const expected = "\\\\\\\\";
      expect(changeEscapeSequence2(input)).toBe(expected);
    });
  });
});
