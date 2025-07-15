import { getCNTimes, getSquare, getNow } from "./index.js";

describe("getCNTimes", () => {
  it("returns an array of c repeated n times", () => {
    expect(getCNTimes(3, "a")).toEqual(["a", "a", "a"]);
    expect(getCNTimes(0, "x")).toEqual([]);
  });

  it("throws if n is negative", () => {
    expect(() => getCNTimes(-1, "a")).toThrow(
      "n must be a non-negative integer"
    );
  });

  it("prints c n times to console", () => {
    const originalLog = console.log;
    const calls = [];
    console.log = (msg) => calls.push(msg);

    getCNTimes(2, "z");

    expect(calls.length).toBe(2);
    expect(calls).toEqual(["z", "z"]);

    console.log = originalLog;
  });
});

describe("getSquare", () => {
  it("returns the square of x", () => {
    expect(getSquare(2)).toBe(4);
    expect(getSquare(-3)).toBe(9);
    expect(getSquare(0)).toBe(0);
  });
});

describe("getNow", () => {
  it("returns a number (timestamp)", () => {
    const now = getNow();
    expect(typeof now).toBe("number");
    expect(now).toBeLessThanOrEqual(Date.now());
  });
});
