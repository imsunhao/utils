module.exports = {
  preset: 'ts-jest',
  globals: {
    __DEV__: false,
    __PRODUCTION__: true,
    __TEST__: true,

    __DEBUG_PORT__: process.env.DEBUG_PORT || false,

    __VERSION__: require('./package.json').version,

    __FEATURE_OPTIONS__: true,
    __FEATURE_SUSPENSE__: true
  },
  coverageDirectory: 'coverage',
  coverageReporters: ['html', 'lcov', 'text'],
  collectCoverageFrom: ['packages/*/src/**/*.ts', '!packages/template-explorer/**', '!packages/size-check/**'],
  watchPathIgnorePatterns: ['/node_modules/'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
  moduleNameMapper: {
    '^packages/(.*?)$': '<rootDir>/packages/$1',
    '^@web-steps/(.*?)$': '<rootDir>/packages/$1/src'
  },
  rootDir: __dirname,
  testMatch: ['<rootDir>/packages/**/__tests__/**/*spec.[jt]s?(x)'],
  testPathIgnorePatterns: process.env.SKIP_E2E
    ? // ignore example tests on netlify builds since they don't contribute
      // to coverage and can cause netlify builds to fail
      ['/node_modules/', '/examples/__tests__']
    : ['/node_modules/']
}
