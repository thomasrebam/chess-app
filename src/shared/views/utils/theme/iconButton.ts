import {ViewStyle} from 'react-native';

import {IconButtonState} from '../components/IconButton/IconButton';
import {ThemeColor} from './colors.types';
import {colors} from './colors';

type IconButtonStyle = Record<
  IconButtonState,
  {
    // eslint-disable-next-line unused-imports/no-unused-vars
    container: (color?: ThemeColor, isBorderColored?: boolean) => ViewStyle;
    // eslint-disable-next-line unused-imports/no-unused-vars
    iconColor: (color?: ThemeColor) => ThemeColor;
  }
>;

const defaultContainerStyle: ViewStyle = {
  paddingVertical: 8,
  paddingHorizontal: 16,
  backgroundColor: colors.white,
  flexDirection: 'row',
  justifyContent: 'center',
};

export const iconButton: IconButtonStyle = {
  default: {
    container: (color?: ThemeColor, isBorderColored?: boolean) => ({
      ...defaultContainerStyle,
      ...(isBorderColored
        ? {
            borderWidth: 1,
            borderRadius: 40,
            borderColor: color ?? colors.textNormal,
          }
        : {}),
    }),
    iconColor: (color?: ThemeColor) => color ?? colors.textNormal,
  },
  disabled: {
    container: (color?: ThemeColor, isBorderColored?: boolean) => ({
      ...defaultContainerStyle,
      ...(isBorderColored
        ? {borderWidth: 1, borderRadius: 40, borderColor: colors.grey200}
        : {}),
    }),
    iconColor: () => colors.grey200,
  },
};
