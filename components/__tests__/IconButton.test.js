import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import IconButton from '../buttons/IconButton';

jest.mock('@fortawesome/react-native-fontawesome', () => ({
  FontAwesomeIcon: 'FontAwesomeIcon',
}));

describe('IconButton', () => {
  it('renders correctly', () => {
    const mockPress = jest.fn();

    const { getByTestId } = render(
      <IconButton onPress={mockPress} icon={'coffee'} />
    );

    const button = getByTestId('icon-button');
    expect(button).toBeDefined();

    fireEvent.press(button);
    expect(mockPress).toHaveBeenCalled();
  });
});
