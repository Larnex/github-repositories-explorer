import {
  cleanup,
  fireEvent,
  render,
  screen,
} from '@testing-library/react-native';
import React from 'react';

import { Input } from './input';

afterEach(cleanup);

describe('Input component ', () => {
  it('renders correctly ', () => {
    render(<Input testID="input" />);
    expect(screen.getByTestId('input')).toBeOnTheScreen();
  });

  it('should render the placeholder correctly ', () => {
    render(<Input testID="input" placeholder="Enter your username" />);
    expect(screen.getByTestId('input')).toBeOnTheScreen();
    expect(
      screen.getByPlaceholderText('Enter your username')
    ).toBeOnTheScreen();
  });

  it('should render the error message correctly', () => {
    render(<Input testID="input" error="This is an error message" />);

    const inputElement = screen.getByTestId('input');
    expect(inputElement).toBeTruthy();

    const errorMessageElement = screen.getByTestId('input-error');
    expect(errorMessageElement).toBeTruthy();
    expect(errorMessageElement.props.children).toBe('This is an error message');
  });

  it('should render the placeholder, error message & placeholder correctly', () => {
    render(
      <Input
        testID="test-input"
        placeholder="Enter username"
        error="This is an error message"
      />
    );

    const input = screen.getByTestId('test-input');
    expect(input).toBeTruthy();

    const inputElement = screen.getByPlaceholderText('Enter username');
    expect(inputElement).toBeTruthy();

    const errorMessageElement = screen.getByTestId('test-input-error');
    expect(errorMessageElement).toBeTruthy();
    expect(errorMessageElement.props.children).toBe('This is an error message');
  });

  it('should trigger onFocus event correctly ', () => {
    const onFocus = jest.fn();
    render(<Input testID="input" onFocus={onFocus} />);

    const input = screen.getByTestId('input');
    fireEvent(input, 'focus');
    expect(onFocus).toHaveBeenCalledTimes(1);
  });

  it('should trigger onBlur event correctly ', () => {
    const onBlur = jest.fn();
    render(<Input testID="input" onBlur={onBlur} />);

    const input = screen.getByTestId('input');
    fireEvent(input, 'blur');
    expect(onBlur).toHaveBeenCalledTimes(1);
  });
  it('should trigger onChangeText event correctly', () => {
    const onChangeText = jest.fn();
    render(<Input testID="input" onChangeText={onChangeText} />);

    const input = screen.getByTestId('input');
    fireEvent.changeText(input, 'test text');
    expect(onChangeText).toHaveBeenCalledTimes(1);
    expect(onChangeText).toHaveBeenCalledWith('test text');
  });
  it('should be disabled when disabled prop is true', () => {
    render(<Input testID="input" disabled={true} />);

    const input = screen.getByTestId('input');
    expect(input.props.disabled).toBe(true);
  });
});
