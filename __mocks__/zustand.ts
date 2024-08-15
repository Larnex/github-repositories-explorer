// This file mocks the `create` function from zustand to reset all stores after each test run

import { act } from '@testing-library/react-native';
import type * as zustand from 'zustand';

const { create: actualCreate } = jest.requireActual<typeof zustand>('zustand');

// A variable to hold reset functions for all stores declared in the app
export const storeResetFns = new Set<() => void>();

const createUncurried = <T>(stateCreator: zustand.StateCreator<T>) => {
  const store = actualCreate(stateCreator);
  const initialState = store.getState();
  storeResetFns.add(() => {
    store.setState(initialState, true);
  });
  return store;
};

// Mock the `create` function from zustand
export const create = (<T>(stateCreator: zustand.StateCreator<T>) => {
  return typeof stateCreator === 'function'
    ? createUncurried(stateCreator)
    : createUncurried;
}) as typeof zustand.create;

// Reset all stores after each test run
afterEach(() => {
  act(() => {
    storeResetFns.forEach((resetFn) => {
      resetFn();
    });
  });
});
