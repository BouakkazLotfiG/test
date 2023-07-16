import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import TextButton from '../buttons/TextButton';
import { COLORS, SIZES } from '../../constants/Theme';

jest.mock('../../constants/Theme', () => ({
  COLORS: {
    primary: '#2c53f5',
    secondary: '#5D2DFD',
    white: '#FFFFFF',
    dimmedWhite: '#f5f6fa',
    black: '#000000',
    green: '#37E39F',
    red: '#e82e2e',
    gray: '#6A6A6A',
    lightGray: '#dbdbdb',
    lightGray1: '#f5f6fa',
  },
  SIZES: {
    base: 8,
    font: 14,
    radius: 12,
    padding: 24,
    margin: 24,
    paddingHorizontal: 12,
    paddingVertical: 8,
    h1: 30,
    h2: 22,
    h3: 16,
    h4: 14,
    body1: 30,
    body2: 22,
    body3: 16,
    body4: 14,
    body5: 12,
    width: 375,
    height: 812,
  },
  FONTS: {
    h1: { fontFamily: 'Roboto-ExtraBold', fontSize: 30, lineHeight: 36 },
    h2: { fontFamily: 'Roboto-Bold', fontSize: 22, lineHeight: 30 },
    h3: { fontFamily: 'Roboto-Bold', fontSize: 16, lineHeight: 22 },
    h4: { fontFamily: 'Roboto-Bold', fontSize: 14, lineHeight: 22 },
    body1: { fontFamily: 'Roboto-Regular', fontSize: 30, lineHeight: 36 },
    body2: { fontFamily: 'Roboto-Regular', fontSize: 22, lineHeight: 30 },
    body3: { fontFamily: 'Roboto-Regular', fontSize: 16, lineHeight: 22 },
    body4: { fontFamily: 'Roboto-Regular', fontSize: 14, lineHeight: 22 },
    body5: { fontFamily: 'Roboto-Regular', fontSize: 12, lineHeight: 22 },
  },
}));

describe('TextButton', () => {
  const mockPress = jest.fn();

  it('renders correctly and responds to press events', () => {
    const { getByText } = render(
      <TextButton onPress={mockPress} text='Test Button' />
    );

    const button = getByText('Test Button');
    expect(button).toBeDefined();

    fireEvent.press(button);
    expect(mockPress).toHaveBeenCalled();
  });

  it('has correct style', () => {
    const { getByText } = render(
      <TextButton onPress={mockPress} text='Test Button' />
    );

    const button = getByText('Test Button');
    expect(button.parent.props.style.backgroundColor).toBe(COLORS.black);
    expect(button.props.style.color).toBe(COLORS.white);
  });
});
