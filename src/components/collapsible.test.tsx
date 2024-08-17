import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react-native';
import React from 'react';

jest.mock('@/api/repos', () => ({
  useRepos: jest.fn(),
}));

import { useRepos } from '@/api/repos';

import { Collapsible } from './collapsible';

const queryClient = new QueryClient();

const renderWithClient = (ui: React.ReactElement) => {
  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
  );
};

describe('Collapsible Component', () => {
  const userProps = {
    login: 'testuser',
    avatar_url: 'https://example.com/avatar.jpg',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with initial state', () => {
    (useRepos as jest.Mock).mockReturnValue({
      data: [],
      isFetchingNextPage: false,
      isLoading: false,
      fetchNextPage: jest.fn(),
      hasNextPage: true,
    });

    renderWithClient(<Collapsible {...userProps} />);
    expect(screen.getByText('testuser')).toBeTruthy();
    expect(screen.getByTestId('user-avatar')).toHaveProp('source', {
      uri: userProps.avatar_url,
    });
  });

  it('toggles the collapsible and fetches data', async () => {
    (useRepos as jest.Mock).mockReturnValue({
      data: [],
      isFetchingNextPage: true,
      isLoading: true,
      fetchNextPage: jest.fn(),
      hasNextPage: true,
    });

    renderWithClient(<Collapsible {...userProps} />);

    fireEvent.press(screen.getByText('testuser'));

    expect(screen.getByTestId('loading-indicator')).toBeTruthy();

    await waitFor(() => {
      expect(screen.getByTestId('empty-list')).toBeTruthy();
    });
  });

  it('shows empty list message when no repositories are found', async () => {
    (useRepos as jest.Mock).mockReturnValue({
      data: [],
      isFetchingNextPage: false,
      isLoading: false,
      fetchNextPage: jest.fn(),
      hasNextPage: true,
    });

    renderWithClient(<Collapsible {...userProps} />);
    fireEvent.press(screen.getByText('testuser'));
    await waitFor(() => {
      expect(screen.getByText('No repositories found')).toBeTruthy();
    });
  });

  it('does not show load more button when no more pages', async () => {
    (useRepos as jest.Mock).mockReturnValue({
      data: [],
      isFetchingNextPage: false,
      isLoading: false,
      fetchNextPage: jest.fn(),
      hasNextPage: false,
    });

    renderWithClient(<Collapsible {...userProps} />);
    fireEvent.press(screen.getByText('testuser'));
    await waitFor(() => {
      expect(screen.queryByTestId('load-more-button')).toBeNull();
    });
  });
});
