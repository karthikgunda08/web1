// jest.config.js
export default {
    testEnvironment: 'node',
    transform: {},
    extensionsToTreatAsEsm: ['.ts', '.js'],
    moduleNameMapper: {
        '^(\\.{1,2}/.*)\\.js$': '$1',
    },
    coverageDirectory: 'coverage',
    collectCoverageFrom: [
        'src/**/*.{js,ts}',
        '!src/config/**',
        '!src/**/*.d.ts',
    ],
    testMatch: ['**/__tests__/**/*.test.js'],
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
};
