import { create } from 'zustand';

import { createSelectors } from './utils';

interface PageState {
  page: number;
  maxPage: number;
  incrementPage: () => void;
  decrementPage: () => void;
  setMaxPage: (maxPage: number) => void;
}

const _usePageStore = create<PageState>((set) => ({
  page: 1,
  maxPage: -1,
  incrementPage: () => set((state) => ({ page: state.page + 1 })),
  decrementPage: () => set((state) => ({ page: state.page - 1 })),
  setMaxPage: (maxPage) => set({ maxPage }),
}));

export const usePageStore = createSelectors(_usePageStore);
