import {FunctionComponent} from 'react';
import {SvgProps} from 'react-native-svg';

import LeftArrow from './LeftArrow.svg';
import RightArrow from './RightArrow.svg';

export type SvgComponent = FunctionComponent<SvgProps>;

export const Icon = {
  LeftArrow,
  RightArrow,
};
