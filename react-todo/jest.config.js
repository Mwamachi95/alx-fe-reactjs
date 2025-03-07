module.exports = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
  testMatch: ["**/?(*.)+(spec|test).[jt]s?(x)"],  // Ensures Jest picks up test files
};
