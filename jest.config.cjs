// jest.config.cjs
/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest/presets/js-with-ts-esm",
  // see default value: https://jestjs.io/docs/configuration#testmatch-arraystring
  testMatch: ["**/?(*.)+(test).(cjs|[jt]s?(x))"],
};
