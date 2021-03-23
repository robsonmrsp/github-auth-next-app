module.exports = {
  rootDir: '.',
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/', '<rootDir>/cypress/'],

  setupFilesAfterEnv: ['<rootDir>/testSetup.js'],

  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': '<rootDir>/node_modules/babel-jest',
  },

  moduleNameMapper: {
    '^@/components/(.*)': '<rootDir>/src/components/$1',
    '^@/shared/(.*)': '<rootDir>/src/shared/$1',
    '^@/config/(.*)': '<rootDir>/src/config/$1',
    '^@/services/(.*)': '<rootDir>/src/services/$1',
  },
};
