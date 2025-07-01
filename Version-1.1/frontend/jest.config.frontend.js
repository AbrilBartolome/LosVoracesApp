// Configuración de jest para el frontend

export default {
  testEnvironment: 'jest-environment-jsdom',
  transform: {},   // sin transformaciones (sin Babel)
  moduleFileExtensions: ['js', 'json', 'mjs'],
  testMatch: ['**/tests/unit/**/*.test.js', '**/tests/unit/**/*.test.mjs'],
  testPathIgnorePatterns: ['/node_modules/'],
  verbose: true,
  clearMocks: true,
  restoreMocks: true,
  resetMocks: true
};