import {fonts} from './fonts';
import {colors} from './colors';
import {button} from './button';
import {radioButton} from './radioButton';
import {switchStyle} from './switch';
import {textInput} from './textInput';
import {tag} from './tag';
import {tooltip} from './tooltip';
import {checkBox} from './checkBox';
import {iconButton} from './iconButton';
import {pressableWithFeedback} from './pressableWithFeedback';

export const theme = {
  colors,
  fonts,
  button,
  radioButton,
  switch: switchStyle,
  textInput,
  tag,
  tooltip,
  checkBox,
  iconButton,
  pressableWithFeedback,
} as const;
