import {AccessibilityRole, StyleProp, View, ViewStyle} from 'react-native';
import {forwardRef} from 'react';
import {useTheme} from '@emotion/react';

import {ThemeColor} from '../../theme/colors.types';

import {Typography} from '../Typography/Typography';
import {InfoIcon} from '../../icons/Info.icon';
import {SuccessIcon} from '../../icons/Success.icon';
import {WarningIcon} from '../../icons/Warning.icon';
import {ErrorIcon} from '../../icons/Error.icon';

const TOOLTIP_ICON_SIZE_PX = 24;

export type TooltipProps = {
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  body: string;
  containerStyle?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
  accessibilityHint?: string;
  accessibilityRole?: AccessibilityRole;
  accessibilityLiveRegion?: 'none' | 'polite' | 'assertive' | undefined;
};

const TooltipIcon = ({
  type,
  size,
  color,
}: {
  type: TooltipProps['type'];
  size: number;
  color: ThemeColor;
}) => {
  switch (type) {
    case 'warning':
      return <WarningIcon size={size} color={color} />;
    case 'success':
      return <SuccessIcon size={size} color={color} />;
    case 'error':
      return <ErrorIcon size={size} color={color} />;
    case 'info':
      return <InfoIcon size={size} color={color} />;
    default:
      return <InfoIcon size={size} color={color} />;
  }
};

export const Tooltip = forwardRef<View, TooltipProps>(
  (
    {
      type,
      title,
      body,
      containerStyle,
      accessibilityLabel,
      accessibilityHint,
      accessibilityRole,
      accessibilityLiveRegion,
    },
    ref,
  ) => {
    const defaultAccessibilityLabel = `${title}: ${body}`;
    const theme = useTheme();
    return (
      <View
        ref={ref}
        style={[theme.tooltip[type].container, containerStyle]}
        accessible
        accessibilityLabel={accessibilityLabel && defaultAccessibilityLabel}
        accessibilityHint={accessibilityHint}
        accessibilityRole={accessibilityRole ?? 'text'}
        accessibilityLiveRegion={accessibilityLiveRegion}>
        <TooltipIcon
          type={type}
          size={TOOLTIP_ICON_SIZE_PX}
          color={theme.tooltip[type].icon.color}
        />
        <View style={tooltipContentContainerStyle}>
          <Typography.P1Bold>{title}</Typography.P1Bold>
          <Typography.P2Regular>{body}</Typography.P2Regular>
        </View>
      </View>
    );
  },
);

Tooltip.displayName = 'Tooltip';

const tooltipContentContainerStyle: ViewStyle = {
  paddingLeft: 8,
  flex: 1,
  flexDirection: 'column',
};
