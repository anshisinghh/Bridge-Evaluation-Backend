module.exports = {
  preset: "ts-jest",
  transform: {
    "^.+\\.(ts|tsx)?$": "ts-jest",
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  verbose: true,
  roots: ["<rootDir>"],
  projects: [
    {
      preset: "ts-jest",
      testEnvironment: "node",
      displayName: "evaluating_bridges",
      // testPathIgnorePatterns: ["<rootDir>"],
      globalSetup: "<rootDir>/src/test_utils/setup.ts",
      // setupFiles: ["<rootDir>/src/test_utils/set_env_vars.ts"],
      setupFilesAfterEnv: ["<rootDir>/src/test_utils/db_setup.ts"],
    },
  ],
};