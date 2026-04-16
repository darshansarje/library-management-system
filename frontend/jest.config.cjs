/** @type {import('jest').Config} */
module.exports = {
  preset: "ts-jest/presets/default-esm",
  testEnvironment: "jsdom",
  testMatch: ["**/?(*.)+(test).[jt]sx"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
  transform: {
    "^.+\\.(ts|tsx)$": ["ts-jest", { useESM: true, tsconfig: "tsconfig.json" }]
  },
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
  testEnvironmentOptions: {
    customExportConditions: ["node", "node-addons"]
  }
};
