module.exports = {
  testEnvironment: "node",
  setupFilesAfterEnv: ["./jest.setup.js"],
  testTimeout: 10000, // Tăng timeout cho test database
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "/__tests__/",
    "/src/infrastructure/database/",
  ],
  silent: false,
};
