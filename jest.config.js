export default {
  transform: {
    '^.+\\.jsx?$': 'babel-jest', // This will handle JavaScript files
    '^.+\\.ts?$': 'ts-jest'      // This will handle TypeScript files, if needed
  },
  testEnvironment: 'node',
  coverageDirectory: 'coverage',
  testPathIgnorePatterns: ['/node_modules/', '/public/']
}
