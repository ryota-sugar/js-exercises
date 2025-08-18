import { littleEndianToBigEndian, bigEndianToLittleEndian } from "./index.ts";

// テストデータ: 0x12345678 → 0x78563412
const littleEndian = new Uint32Array([
  0x12345678, 0x78abcdef, 0xffffffff, 0x00000000,
]);
const bigEndian = new Uint32Array([
  0x78563412, 0xefcdab78, 0xffffffff, 0x00000000,
]);

describe("littleEndianToBigEndian", () => {
  it("should convert little endian to big endian", () => {
    const result = littleEndianToBigEndian(littleEndian);
    expect(Array.from(result)).toEqual(Array.from(bigEndian));
  });
});

describe("bigEndianToLittleEndian", () => {
  it("should convert big endian to little endian", () => {
    const result = bigEndianToLittleEndian(bigEndian);
    expect(Array.from(result)).toEqual(Array.from(littleEndian));
  });
});

describe("check same value", () => {
  it("should return original when converting twice", () => {
    const result = bigEndianToLittleEndian(
      littleEndianToBigEndian(littleEndian)
    );
    expect(Array.from(result)).toEqual(Array.from(littleEndian));
  });
});
