import {useTheme} from '@emotion/react';
import React, {ReactNode} from 'react';
import {Text, TextProps} from 'react-native';

import {ThemeColor} from '../../theme/colors.types';

const Title = React.forwardRef<Text, TypographyProps>(
  ({accessibilityRole = 'header', ...props}, ref) => {
    return (
      <BaseText
        ref={ref}
        accessibilityRole={accessibilityRole} //TODO on android 'header' is not read out
        {...props}
      />
    );
  },
);
Title.displayName = 'Title';

const Paragraph = React.forwardRef<Text, TypographyProps>(
  (
    {
      maxLinesBeforeEllipsis = 0, //this means no restriction if set to 0
      ...textProps
    },
    ref,
  ) => {
    return (
      <BaseText
        {...textProps}
        maxLinesBeforeEllipsis={maxLinesBeforeEllipsis}
        ref={ref}
      />
    );
  },
);
Paragraph.displayName = 'Paragraph';

type TypographyProps = TextProps & {
  children: ReactNode;
  color?: ThemeColor;
  isUnderlined?: boolean;
  maxLinesBeforeEllipsis?: number;
};

const BaseText = React.forwardRef<Text, TypographyProps>(
  (
    {
      children,
      color,
      isUnderlined,
      maxLinesBeforeEllipsis,
      style,
      ...textProps
    },
    ref,
  ) => {
    const theme = useTheme();
    const underlineStyle = {
      textDecorationLine: isUnderlined ? 'underline' : 'none',
    } as const;

    return (
      <Text
        ref={ref}
        style={[
          {color: color ?? theme.colors.textNormal},
          underlineStyle,
          style,
        ]}
        {...textProps}
        numberOfLines={maxLinesBeforeEllipsis}>
        {children}
      </Text>
    );
  },
);
BaseText.displayName = 'BaseText';

const TitleXXXLarge = React.forwardRef<Text, TypographyProps>(
  ({style, ...props}, ref) => {
    const theme = useTheme();
    return (
      <Title ref={ref} style={[theme.fonts.title.xxxl, style]} {...props} />
    );
  },
);
TitleXXXLarge.displayName = 'TitleXXXLarge';

const TitleXXLarge = React.forwardRef<Text, TypographyProps>(
  ({style, ...props}, ref) => {
    const theme = useTheme();
    return (
      <Title ref={ref} style={[theme.fonts.title.xxl, style]} {...props} />
    );
  },
);
TitleXXLarge.displayName = 'TitleXXLarge';

const TitleXLarge = React.forwardRef<Text, TypographyProps>(
  ({style, ...props}, ref) => {
    const theme = useTheme();
    return <Title ref={ref} style={[theme.fonts.title.xl, style]} {...props} />;
  },
);
TitleXLarge.displayName = 'TitleXLarge';

const TitleLarge = React.forwardRef<Text, TypographyProps>(
  ({style, ...props}, ref) => {
    const theme = useTheme();
    return <Title ref={ref} style={[theme.fonts.title.l, style]} {...props} />;
  },
);
TitleLarge.displayName = 'TitleLarge';

const TitleMedium = React.forwardRef<Text, TypographyProps>(
  ({style, ...props}, ref) => {
    const theme = useTheme();
    return <Title ref={ref} style={[theme.fonts.title.m, style]} {...props} />;
  },
);
TitleMedium.displayName = 'TitleMedium';

const TitleSmall = React.forwardRef<Text, TypographyProps>(
  ({style, ...props}, ref) => {
    const theme = useTheme();
    return <Title ref={ref} style={[theme.fonts.title.s, style]} {...props} />;
  },
);
TitleSmall.displayName = 'TitleSmall';

const TitleXSmall = React.forwardRef<Text, TypographyProps>(
  ({style, ...props}, ref) => {
    const theme = useTheme();
    return <Title ref={ref} style={[theme.fonts.title.xs, style]} {...props} />;
  },
);
TitleXSmall.displayName = 'TitleXSmall';

const P1Regular = React.forwardRef<Text, TypographyProps>(
  ({style, ...props}, ref) => {
    const theme = useTheme();
    return (
      <Paragraph
        style={[theme.fonts.paragraph.p1.regular, style]}
        {...props}
        ref={ref}
      />
    );
  },
);
P1Regular.displayName = 'P1Regular';

const P2Regular = React.forwardRef<Text, TypographyProps>(
  ({style, ...props}, ref) => {
    const theme = useTheme();
    return (
      <Paragraph
        style={[theme.fonts.paragraph.p2.regular, style]}
        {...props}
        ref={ref}
      />
    );
  },
);
P2Regular.displayName = 'P2Regular';

const P3Regular = React.forwardRef<Text, TypographyProps>(
  ({style, ...props}, ref) => {
    const theme = useTheme();
    return (
      <Paragraph
        style={[theme.fonts.paragraph.p3.regular, style]}
        {...props}
        ref={ref}
      />
    );
  },
);
P3Regular.displayName = 'P3Regular';

const P1Bold = React.forwardRef<Text, TypographyProps>(
  ({style, ...props}, ref) => {
    const theme = useTheme();
    return (
      <Paragraph
        style={[theme.fonts.paragraph.p1.bold, style]}
        {...props}
        ref={ref}
      />
    );
  },
);
P1Bold.displayName = 'P1Bold';

const P2Bold = React.forwardRef<Text, TypographyProps>(
  ({style, ...props}, ref) => {
    const theme = useTheme();
    return (
      <Paragraph
        style={[theme.fonts.paragraph.p2.bold, style]}
        {...props}
        ref={ref}
      />
    );
  },
);
P2Bold.displayName = 'P2Bold';

const P3Bold = React.forwardRef<Text, TypographyProps>(
  ({style, ...props}, ref) => {
    const theme = useTheme();
    return (
      <Paragraph
        style={[theme.fonts.paragraph.p3.bold, style]}
        {...props}
        ref={ref}
      />
    );
  },
);
P3Bold.displayName = 'P3Bold';

const P1Italic = React.forwardRef<Text, TypographyProps>(
  ({style, ...props}, ref) => {
    const theme = useTheme();
    return (
      <Paragraph
        style={[theme.fonts.paragraph.p1.italic, style]}
        {...props}
        ref={ref}
      />
    );
  },
);
P1Italic.displayName = 'P1Italic';

const P2Italic = React.forwardRef<Text, TypographyProps>(
  ({style, ...props}, ref) => {
    const theme = useTheme();
    return (
      <Paragraph
        style={[theme.fonts.paragraph.p2.italic, style]}
        {...props}
        ref={ref}
      />
    );
  },
);
P2Italic.displayName = 'P2Italic';

const P3Italic = React.forwardRef<Text, TypographyProps>(
  ({style, ...props}, ref) => {
    const theme = useTheme();
    return (
      <Paragraph
        style={[theme.fonts.paragraph.p3.italic, style]}
        {...props}
        ref={ref}
      />
    );
  },
);
P3Italic.displayName = 'P3Italic';

export const Typography = {
  TitleXXXLarge,
  TitleXXLarge,
  TitleXLarge,
  TitleLarge,
  TitleMedium,
  TitleSmall,
  TitleXSmall,
  P1Regular,
  P1Bold,
  P1Italic,
  P2Regular,
  P2Bold,
  P2Italic,
  P3Regular,
  P3Bold,
  P3Italic,
};
