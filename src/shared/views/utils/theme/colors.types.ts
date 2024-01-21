import {colors} from './colors';
import {Flatten} from './utils';

type Colors = typeof colors;

export type ThemeColor = Flatten<Colors>;
