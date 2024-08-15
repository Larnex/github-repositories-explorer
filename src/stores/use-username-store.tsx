// Zustand store for storing the username

import { create } from 'zustand';

import { createSelectors } from './utils';

interface UsernameState {
  username: string;
  setUsername: (username: string) => void;
}

const _useUsername = create<UsernameState>((set) => ({
  username: '',
  setUsername: (username: string) => set({ username }),
}));

export const useUsername = createSelectors(_useUsername);
