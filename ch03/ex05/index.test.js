import { convertLfToCrLf, convertCrLfToLf } from "./index.js";

describe("convert", () => {
  describe("convertLfToCrLf", () => {
    it("converts LF to CRLF", () => {
      const input = "Hello\nWorld";
      const expectedOutput = "Hello\r\nWorld";
      expect(convertLfToCrLf(input)).toBe(expectedOutput);
    });

    it("does not modify CRLF sequences", () => {
      const input = "Hello\r\nWorld";
      const expectedOutput = "Hello\r\nWorld";
      expect(convertLfToCrLf(input)).toBe(expectedOutput);
    });

    it("handles empty strings", () => {
      const input = "";
      const expectedOutput = "";
      expect(convertLfToCrLf(input)).toBe(expectedOutput);
    });
  });

  describe("convertCrLfToLf", () => {
    it("converts CRLF to LF", () => {
      const input = "Hello\r\nWorld";
      const expectedOutput = "Hello\nWorld";
      expect(convertCrLfToLf(input)).toBe(expectedOutput);
    });

    it("does not modify LF sequences", () => {
      const input = "Hello\nWorld";
      const expectedOutput = "Hello\nWorld";
      expect(convertCrLfToLf(input)).toBe(expectedOutput);
    });

    it("handles empty strings", () => {
      const input = "";
      const expectedOutput = "";
      expect(convertCrLfToLf(input)).toBe(expectedOutput);
    });
  });
});
