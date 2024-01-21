import {theme} from './theme';

type ThemeInterface = typeof theme;

declare module '@emotion/react' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface Theme extends ThemeInterface {}
}
