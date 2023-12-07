import {TextStyle, ViewStyle} from 'react-native';

import {colors} from './colors';
import {ThemeColor} from './colors.types';

export type ButtonState = 'rest' | 'disabled' | 'active';

export type BaseButtonStyle = Record<
  ButtonState,
  {
    container: ViewStyle;
    text: {color: ThemeColor} & TextStyle;
  }
>;

const defaultContainerStyle: ViewStyle = {
  borderWidth: 1,
  borderRadius: 40,
  paddingVertical: 8,
  paddingHorizontal: 16,
  alignItems: 'center',
  flexDirection: 'row',
  justifyContent: 'center',
};

const primaryButtonStyle: BaseButtonStyle = {
  rest: {
    container: {
      ...defaultContainerStyle,
      backgroundColor: colors.primary500,
      borderColor: 'transparent',
    },
    text: {
      color: colors.white,
    },
  },
  disabled: {
    container: {
      ...defaultContainerStyle,
      backgroundColor: colors.grey50,
      borderColor: 'transparent',
    },
    text: {
      color: colors.grey300,
    },
  },
  active: {
    container: {
      ...defaultContainerStyle,
      backgroundColor: colors.primary500,
      borderColor: 'transparent',
      opacity: 0.5,
    },
    text: {color: colors.white},
  },
};

const secondaryButtonStyle: BaseButtonStyle = {
  rest: {
    container: {
      ...defaultContainerStyle,
      backgroundColor: 'transparent',
      borderColor: colors.primary500,
    },
    text: {
      color: colors.primary500,
    },
  },
  disabled: {
    container: {
      ...defaultContainerStyle,
      backgroundColor: colors.grey50,
      borderColor: colors.grey300,
    },
    text: {
      color: colors.grey300,
    },
  },
  active: {
    container: {
      ...defaultContainerStyle,
      backgroundColor: 'transparent',
      borderColor: colors.primary500,
      opacity: 0.5,
    },
    text: {
      color: colors.primary500,
    },
  },
};

const tertiaryButtonStyle: BaseButtonStyle = {
  rest: {
    container: {
      ...defaultContainerStyle,
      backgroundColor: 'transparent',
      borderColor: 'transparent',
    },
    text: {
      color: colors.primary500,
      textDecorationLine: 'underline',
    },
  },
  disabled: {
    container: {
      ...defaultContainerStyle,
      backgroundColor: 'transparent',
      borderColor: 'transparent',
    },
    text: {
      textDecorationLine: 'underline',
      color: colors.grey300,
    },
  },
  active: {
    container: {
      ...defaultContainerStyle,
      backgroundColor: 'transparent',
      borderColor: 'transparent',
      opacity: 0.5,
    },
    text: {
      color: colors.primary500,
      textDecorationLine: 'underline',
    },
  },
};

export const button = {
  primary: primaryButtonStyle,
  secondary: secondaryButtonStyle,
  tertiary: tertiaryButtonStyle,
};
