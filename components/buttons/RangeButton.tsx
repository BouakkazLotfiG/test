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
  selected: boolean;
}

const RangeButton: React.FC<RangeButtonProps> = ({
  onPress,
  text,
  selected,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.button,
        selected ? styles.selectedButton : styles.unselectedButton,
      ]}
    >
      <Text style={selected ? styles.selectedText : styles.unselectedText}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: SIZES.radius * 1.5,
    paddingHorizontal: SIZES.paddingHorizontal,
  },
  selectedButton: {
    backgroundColor: COLORS.black,
  },
  unselectedButton: {
    backgroundColor: COLORS.white,
    borderColor: COLORS.lightGray,
    borderWidth: 1,
  },
  selectedText: {
    fontSize: SIZES.h4,

    color: COLORS.white,
    padding: SIZES.padding * 0.25,
    alignSelf: 'center',
  },
  unselectedText: {
    fontSize: SIZES.h4,
    color: COLORS.black,
    padding: SIZES.padding * 0.25,
    alignSelf: 'center',
  },
});

export default RangeButton;
