module.exports = {
  preset: "ts-jest",
  transform: {
    "^.+\\.(ts|tsx)?$": "ts-jest",
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  verbose: true,
  roots: ["./src"],
  projects: [
    {
      preset: "ts-jest",
      testEnvironment: "node",
      displayName: "evaluating_bridges",
      // testPathIgnorePatterns: ["<rootDir>"],
      globalSetup: "./src/test_utils/setup.ts",
      setupFiles: ["./src/test_utils/set_env_vars.ts"],
      setupFilesAfterEnv: ["./src/test_utils/db_setup.ts"],
    },
  ],
};