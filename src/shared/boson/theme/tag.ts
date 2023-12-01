import {ViewStyle} from 'react-native';

import {TagVariant} from '../components/Tag/Tag';
import {ThemeColor} from './colors.types';
import {colors} from './colors';

type TagStyle = Record<
  TagVariant,
  {
    containerStyle: ViewStyle;
    iconStyle: {color: ThemeColor};
    textStyle: {color: ThemeColor};
  }
>;

const defaultContainerStyle: ViewStyle = {
  borderWidth: 1,
  borderRadius: 40,
  padding: 8,
  alignItems: 'center',
  flexDirection: 'row',
  alignSelf: 'flex-start',
};

export const tag: TagStyle = {
  valid: {
    containerStyle: {
      ...defaultContainerStyle,
      backgroundColor: colors.white,
      borderColor: colors.statusSuccess,
    },
    iconStyle: {
      color: colors.statusSuccess,
    },
    textStyle: {
      color: colors.statusSuccess,
    },
  },
  error: {
    containerStyle: {
      ...defaultContainerStyle,
      backgroundColor: colors.white,
      borderColor: colors.statusError,
    },
    iconStyle: {
      color: colors.statusError,
    },
    textStyle: {
      color: colors.statusError,
    },
  },
  disabled: {
    containerStyle: {
      ...defaultContainerStyle,
      backgroundColor: colors.grey50,
      borderColor: colors.grey200,
    },
    iconStyle: {
      color: colors.grey200,
    },
    textStyle: {
      color: colors.grey200,
    },
  },
  default: {
    containerStyle: {
      ...defaultContainerStyle,
      backgroundColor: colors.white,
      borderColor: colors.primary500,
    },
    iconStyle: {
      color: colors.primary500,
    },
    textStyle: {
      color: colors.primary500,
    },
  },
};
