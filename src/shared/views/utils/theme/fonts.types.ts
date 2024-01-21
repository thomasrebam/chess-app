export const fontFamilies = {
  openSansBold: 'OpenSans-Bold',
  openSansBoldItalic: 'OpenSans-BoldItalic',
  openSansExtraBold: 'OpenSans-ExtraBold',
  openSansExtraBoldItalic: 'OpenSans-ExtraBoldItalic',
  openSansItalic: 'OpenSans-Italic',
  openSansLightItalic: 'OpenSans-LightItalic',
  openSansLight: 'OpenSans-Light',
  openSansMedium: 'OpenSans-Medium',
  openSansMediumItalic: 'OpenSans-MediumItalic',
  openSansRegular: 'OpenSans-Regular',
  openSansSemiBold: 'OpenSans-SemiBold',
  openSansSemiBoldItalic: 'OpenSans-SemiBoldItalic',
} as const;

export type FontFamily = (typeof fontFamilies)[keyof typeof fontFamilies];

const paragraphFontTypes = ['regular', 'italic', 'bold'] as const;

export type ParagraphFontType = (typeof paragraphFontTypes)[number];

export type FontStyle = {
  fontSize: number;
  lineHeight: number;
  fontFamily: FontFamily;
};

const titleFontSizes = ['xs', 's', 'm', 'l', 'xl', 'xxl', 'xxxl'] as const;

type TitleFontSize = (typeof titleFontSizes)[number];

const paragraphFontSizes = ['p1', 'p2', 'p3'] as const;

type ParagraphFontSize = (typeof paragraphFontSizes)[number];

export type Fonts = {
  title: Record<TitleFontSize, FontStyle>;
  paragraph: Record<ParagraphFontSize, Record<ParagraphFontType, FontStyle>>;
};
