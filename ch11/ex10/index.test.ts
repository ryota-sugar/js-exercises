import {
  getDaysInMonth,
  getDaysWithoutSuturdayAndSunday,
  dayOfWeek,
  getFirstDayOfLastMonth,
} from "./index.ts";

describe("getDaysInMonth", () => {
  it("returns 31 for January", () => {
    expect(getDaysInMonth(2025, 1)).toBe(31);
  });
  it("returns 28 for February (non-leap year)", () => {
    expect(getDaysInMonth(2023, 2)).toBe(28);
  });
  it("returns 29 for February (leap year)", () => {
    expect(getDaysInMonth(2024, 2)).toBe(29);
  });
  it("throws error for invalid month", () => {
    expect(() => getDaysInMonth(2025, 0)).toThrow();
    expect(() => getDaysInMonth(2025, 13)).toThrow();
  });
});

describe("getDaysWithoutSuturdayAndSunday", () => {
  it("counts weekdays between two dates", () => {
    expect(getDaysWithoutSuturdayAndSunday("2025-08-01", "2025-08-07")).toBe(5); // 1〜7の平日
  });
  it("returns 0 if all days are weekends", () => {
    expect(getDaysWithoutSuturdayAndSunday("2025-08-02", "2025-08-03")).toBe(0); // 土日
  });
  it("throws error for invalid date format", () => {
    expect(() =>
      getDaysWithoutSuturdayAndSunday("2025-8-01", "2025-08-07")
    ).toThrow();
    expect(() =>
      getDaysWithoutSuturdayAndSunday("2025-08-01", "2025-8-7")
    ).toThrow();
  });
});

describe("dayOfWeek", () => {
  it("returns correct weekday in English", () => {
    expect(dayOfWeek("2025-08-17", "en-US")).toBe("Sunday");
  });
  it("returns correct weekday in Japanese", () => {
    expect(dayOfWeek("2025-08-18", "ja-JP")).toBe("月曜日");
  });
  it("throws error for invalid date format", () => {
    expect(() => dayOfWeek("2025-8-17", "en-US")).toThrow();
  });
});

describe("getFirstDayOfLastMonth", () => {
  it("returns the first day of last month at 0:00:00", () => {
    const now = new Date();
    const year =
      now.getMonth() === 0 ? now.getFullYear() - 1 : now.getFullYear();
    const month = now.getMonth() === 0 ? 11 : now.getMonth() - 1;
    const expected = new Date(year, month, 1, 0, 0, 0, 0);
    const result = getFirstDayOfLastMonth();
    expect(result.getFullYear()).toBe(expected.getFullYear());
    expect(result.getMonth()).toBe(expected.getMonth());
    expect(result.getDate()).toBe(1);
    expect(result.getHours()).toBe(0);
    expect(result.getMinutes()).toBe(0);
    expect(result.getSeconds()).toBe(0);
    expect(result.getMilliseconds()).toBe(0);
  });
});
