module.exports = {
  rootDir: '.',
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  setupFilesAfterEnv: ['<rootDir>/testSetup.js'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': '<rootDir>/node_modules/babel-jest',
  },

  moduleNameMapper: {
    '^@/components/(.*)': '<rootDir>/src/components/$1',
    '^@/shared/(.*)': '<rootDir>/src/shared/$1',
    '^@/config/(.*)': '<rootDir>/src/config/$1',
  },
};
