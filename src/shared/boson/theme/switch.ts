import {SwitchState} from '../components/Switch/Switch';
import {colors} from './colors';
import {ThemeColor} from './colors.types';

type BaseSwitchStyle = {
  background: {
    color: ThemeColor;
    borderColor: ThemeColor | 'transparent';
  };
  foreground: {color: ThemeColor};
};

type SwitchStyle = Record<SwitchState, BaseSwitchStyle> & {
  borderWitdh: number;
  loaderColor: ThemeColor;
  disabledOpacity: number;
};

export const switchStyle: SwitchStyle = {
  off: {
    background: {
      color: colors.grey200,
      borderColor: 'transparent',
    },
    foreground: {
      color: colors.textNormal,
    },
  },
  on: {
    background: {
      color: colors.primary500,
      borderColor: 'transparent',
    },
    foreground: {
      color: colors.white,
    },
  },
  borderWitdh: 1,
  loaderColor: colors.white,
  disabledOpacity: 0.5,
};
