import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react-native';
import React from 'react';

import HomeScreen from './index';

// Create a query client for testing
const queryClient = new QueryClient();

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <NavigationContainer>
      <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
    </NavigationContainer>
  );
};

describe('HomeScreen Form Validation', () => {
  it('displays error when username is empty', async () => {
    renderWithProviders(<HomeScreen />);
    const input = screen.getByPlaceholderText('Enter username');

    fireEvent.changeText(input, '');
    fireEvent(input, 'submitEditing');

    await waitFor(() => {
      expect(screen.getByText('Username is required')).toBeTruthy();
    });
  });

  it('displays error when username exceeds 39 characters', async () => {
    renderWithProviders(<HomeScreen />);
    const input = screen.getByPlaceholderText('Enter username');

    fireEvent.changeText(input, 'a'.repeat(40));
    fireEvent(input, 'submitEditing');

    await waitFor(() => {
      expect(
        screen.getByText('Username must be 39 characters or less')
      ).toBeTruthy();
    });
  });

  it('displays error when username contains invalid characters', async () => {
    renderWithProviders(<HomeScreen />);
    const input = screen.getByPlaceholderText('Enter username');

    fireEvent.changeText(input, 'user@name');
    fireEvent(input, 'submitEditing');

    await waitFor(() => {
      expect(
        screen.getByText(
          'Username can only contain alphanumeric characters and hyphens, but cannot contain consecutive hyphens'
        )
      ).toBeTruthy();
    });
  });

  it('displays error when username contains consecutive hyphens', async () => {
    renderWithProviders(<HomeScreen />);
    const input = screen.getByPlaceholderText('Enter username');

    fireEvent.changeText(input, 'user--name');
    fireEvent(input, 'submitEditing');

    await waitFor(() => {
      expect(
        screen.getByText('Username cannot contain consecutive hyphens')
      ).toBeTruthy();
    });
  });

  it('does not display error when username is valid', async () => {
    renderWithProviders(<HomeScreen />);
    const input = screen.getByPlaceholderText('Enter username');

    fireEvent.changeText(input, 'user-name123');
    fireEvent(input, 'submitEditing');

    // Split assertions into separate waitFor calls to comply with the ESLint rule
    await waitFor(() => {
      expect(screen.queryByText('Username is required')).toBeNull();
    });

    await waitFor(() => {
      expect(
        screen.queryByText('Username must be 39 characters or less')
      ).toBeNull();
    });

    await waitFor(() => {
      expect(
        screen.queryByText(
          'Username can only contain alphanumeric characters and hyphens'
        )
      ).toBeNull();
    });

    await waitFor(() => {
      expect(
        screen.queryByText('Username cannot contain consecutive hyphens')
      ).toBeNull();
    });
  });
});
