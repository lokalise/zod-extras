import type { Config } from 'jest'

const config: Config = {
  moduleFileExtensions: ['ts', 'js', 'json'],
  testMatch: ['<rootDir>/src/**/*.(spec|test).ts'],

  transform: {
    '^.+\\.ts$': ['ts-jest', { diagnostics: false }],
  },
  testEnvironment: 'node',
  reporters: ['default'],
  // src/index.ts is the imperative shell and will not be tested
  coveragePathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/coverage/', 'src/index.ts'],
  coverageThreshold: {
    global: {
      statements: 100,
      branches: 100,
      functions: 100,
      lines: 100,
    },
  },
}

export default config
