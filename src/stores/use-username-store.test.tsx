import { act, renderHook } from '@testing-library/react-native';

import { useUsername } from './use-username-store';

describe('useUsername', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  test('should initialize with an empty username', () => {
    const { result } = renderHook(() => useUsername.use.username());
    expect(result.current).toBe('');
  });

  test('should update username when setUsername is called', () => {
    const { result } = renderHook(() => useUsername());

    act(() => {
      result.current.setUsername('testuser');
    });

    expect(result.current.username).toBe('testuser');
  });

  test('should allow setting username to an empty string', () => {
    const { result } = renderHook(() => useUsername());

    act(() => {
      result.current.setUsername('testuser');
    });

    act(() => {
      result.current.setUsername('');
    });

    expect(result.current.username).toBe('');
  });

  test('should not change username when set to the same value', () => {
    const { result } = renderHook(() => useUsername());

    act(() => {
      result.current.setUsername('testuser');
    });

    const previousState = result.current;

    act(() => {
      result.current.setUsername('testuser');
    });

    expect(result.current).toStrictEqual(previousState);
  });
});
