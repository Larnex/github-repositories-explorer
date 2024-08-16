// Purpose: Setup file for Jest tests.
// @ts-ignore
global.window = {};
// @ts-ignore
global.window = global;

import '@testing-library/jest-dom';
jest.mock('zustand');
