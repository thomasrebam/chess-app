import {FunctionComponent} from 'react';
import {SvgProps} from 'react-native-svg';

import LeftArrow from './LeftArrow.svg';
import RightArrow from './RightArrow.svg';
import TrashCan from './TrashCan.svg';
import TrueCheck from './TrueCheck.svg';
import FalseCross from './FalseCross.svg';

export type SvgComponent = FunctionComponent<SvgProps>;

export const Icon = {
  LeftArrow,
  RightArrow,
  TrashCan,
  TrueCheck,
  FalseCross,
};
