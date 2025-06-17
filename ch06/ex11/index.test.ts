import { p } from "./index.ts";

describe("Polar", () => {
  beforeEach(() => {
    p.r = 0;
    p.theta = 0;
  });

  test("getter x, y", () => {
    p.r = 2;
    p.theta = Math.PI / 2;
    expect(p.x).toBeCloseTo(2 * Math.cos(Math.PI / 2));
    expect(p.y).toBeCloseTo(2 * Math.sin(Math.PI / 2));
  });

  test("setter x updates r and theta", () => {
    p.y = 3;
    p.x = 4;
    expect(p.r).toBeCloseTo(5); // sqrt(4^2 + 3^2)
    expect(p.theta).toBeCloseTo(Math.atan2(3, 4));
  });

  test("setter y updates r and theta", () => {
    p.x = 6;
    p.y = 8;
    expect(p.r).toBeCloseTo(10); // sqrt(6^2 + 8^2)
    expect(p.theta).toBeCloseTo(Math.atan2(8, 6));
  });

  test("setter x throws on NaN", () => {
    expect(() => {
      p.x = NaN;
    }).toThrow(TypeError);
  });

  test("setter y throws on NaN", () => {
    expect(() => {
      p.y = NaN;
    }).toThrow(TypeError);
  });
});
