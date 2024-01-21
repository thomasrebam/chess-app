import {TextStyle} from 'react-native';

import {RadioButtonState} from '../components/RadioButton/RadioButton';
import {ThemeColor} from './colors.types';
import {colors} from './colors';

type RadioButtonStyle = Record<RadioButtonState, TextStyle> & {
  checkedIconColor: ThemeColor;
};

export const radioButton: RadioButtonStyle = {
  enabled: {
    color: colors.textNormal,
  },
  disabled: {
    color: colors.grey300,
  },
  checkedIconColor: colors.textNormal,
};
