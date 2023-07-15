import React from 'react';
import {
  TouchableOpacity,
  Text,
  TouchableOpacityProps,
  StyleSheet,
  GestureResponderEvent,
} from 'react-native';
import { SIZES, COLORS, FONTS } from '../../constants/Theme';

interface RangeButtonProps extends TouchableOpacityProps {
  text: string;
  onPress?: (event: GestureResponderEvent) => void;
}

const RangeButton: React.FC<RangeButtonProps> = ({ onPress, text }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.RangeButtonContainer}>
      <Text style={styles.RangeButtonText}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  RangeButtonContainer: {
    backgroundColor: COLORS.black,
    borderRadius: SIZES.radius * 1.5,
    paddingHorizontal: SIZES.paddingHorizontal,
  },
  RangeButtonText: {
    fontSize: SIZES.h4,
    color: COLORS.white,
    padding: SIZES.padding * 0.25,
    alignSelf: 'center',
  },
});

export default RangeButton;
