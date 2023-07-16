import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import RangeButton from '../buttons/RangeButton';
import { COLORS } from '../../constants/Theme';

describe('RangeButton', () => {
  const mockPress = jest.fn();

  it('renders correctly and responds to press events', () => {
    const { getByText } = render(
      <RangeButton onPress={mockPress} text='Test Button' selected={false} />
    );

    const button = getByText('Test Button');
    expect(button).toBeDefined();

    fireEvent.press(button);
    expect(mockPress).toHaveBeenCalled();
  });

  it('has selected style when selected prop is true', () => {
    const { getByText, getByTestId } = render(
      <RangeButton onPress={mockPress} text='Test Button' selected={true} />
    );

    const button = getByTestId('range-button');
    expect(button.props.style.backgroundColor).toBe(COLORS.black);

    const text = getByText('Test Button');
    expect(text.props.style.color).toBe(COLORS.white);
  });

  it('has unselected style when selected prop is false', () => {
    const { getByText, getByTestId } = render(
      <RangeButton onPress={mockPress} text='Test Button' selected={false} />
    );

    const button = getByTestId('range-button');
    expect(button.props.style.backgroundColor).toBe(COLORS.white);

    const text = getByText('Test Button');
    expect(text.props.style.color).toBe(COLORS.black);
  });
});
