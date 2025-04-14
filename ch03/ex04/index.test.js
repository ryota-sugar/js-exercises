describe("Hundred Points Symbol Emoji Tests", () => {
  test("should return '💯'.length is 2", () => {
    const hundredPointsSymbol = "💯";
    expect(hundredPointsSymbol.length).toBe(2);
  });

  test("should return equal when comparing utf-16 and utf-32 ", () => {
    const hundredPointsSymbol = "💯";
    const utf_16 = "\u{D83D}\u{DCAF}";
    const utf_32 = "\u{001F4AF}";
    expect(hundredPointsSymbol === utf_16).toBe(true);
    expect(hundredPointsSymbol === utf_32).toBe(true);
  });
});
