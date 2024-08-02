export default {
  transform: {
    '^.+\\.jsx?$': 'babel-jest' // This will handle JavaScript files
  },
  testEnvironment: 'node',
  coverageDirectory: 'coverage',
  testPathIgnorePatterns: ['/node_modules/', '/public/']
}
