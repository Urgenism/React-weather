import matchers from '@testing-library/jest-dom/matchers';
import { cleanup } from '@testing-library/react';
import { setupServer } from 'msw/node';
import { expect, afterEach } from 'vitest';

import { handlers } from 'utils/msw/handlers';

export const server = setupServer(...handlers);

expect.extend(matchers);

// Establish API mocking before all tests.
beforeAll(() => server.listen());

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => {
  server.resetHandlers();
  cleanup();
});

// Clean up after the tests are finished.
afterAll(() => server.close());
