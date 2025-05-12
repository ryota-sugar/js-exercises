import { has31Days1, has31Days2 } from "./index.js";

describe("has31Days", () => {
  describe("has31Days1", () => {
    it("should return true for months with 31 days", () => {
      expect(has31Days1("Jan")).toBe(true);
      expect(has31Days1("Mar")).toBe(true);
      expect(has31Days1("May")).toBe(true);
      expect(has31Days1("Jul")).toBe(true);
      expect(has31Days1("Aug")).toBe(true);
      expect(has31Days1("Oct")).toBe(true);
      expect(has31Days1("Dec")).toBe(true);
    });

    it("should return false for months without 31 days", () => {
      expect(has31Days1("Feb")).toBe(false);
      expect(has31Days1("Apr")).toBe(false);
      expect(has31Days1("Jun")).toBe(false);
      expect(has31Days1("Sep")).toBe(false);
      expect(has31Days1("Nov")).toBe(false);
    });

    it("should throw an error for invalid month names", () => {
      expect(() => has31Days1("InvalidMonth")).toThrowError("Invalid month");
    });
  });

  describe("has31Days2", () => {
    it("should return true for months with 31 days", () => {
      expect(has31Days2("Jan")).toBe(true);
      expect(has31Days2("Mar")).toBe(true);
      expect(has31Days2("May")).toBe(true);
      expect(has31Days2("Jul")).toBe(true);
      expect(has31Days2("Aug")).toBe(true);
      expect(has31Days2("Oct")).toBe(true);
      expect(has31Days2("Dec")).toBe(true);
    });

    it("should return false for months without 31 days", () => {
      expect(has31Days2("Feb")).toBe(false);
      expect(has31Days2("Apr")).toBe(false);
      expect(has31Days2("Jun")).toBe(false);
      expect(has31Days2("Sep")).toBe(false);
      expect(has31Days2("Nov")).toBe(false);
    });

    it("should throw an error for invalid month names", () => {
      expect(() => has31Days2("InvalidMonth")).toThrowError("Invalid month");
    });
  });
});
