module.exports = {
  preset: 'ts-jest',
  testMatch: ["**/__tests__/**/*.test.ts"],
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['./setupTests.ts'],
};