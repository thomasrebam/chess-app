import React from 'react';
import {View} from 'react-native';

// Get autocomplete for recommended values, but allow others too.
type SpacingValue = 4 | 8 | 16 | 24 | 40 | number;

type Props =
  | {horizontal: SpacingValue; flex?: number}
  | {vertical: SpacingValue; flex?: number}
  | {flex?: number};

const SpacerUnmemoized = (props: Props) => {
  if ('flex' in props) {
    return (
      <View
        style={{
          flex: props.flex,
          ...('horizontal' in props && {minWidth: props.horizontal}),
          ...('vertical' in props && {minHeight: props.vertical}),
        }}
      />
    );
  }

  return (
    <View
      style={{
        ...('horizontal' in props && {width: props.horizontal}),
        ...('vertical' in props && {height: props.vertical}),
      }}
    />
  );
};

export const Spacer = React.memo(SpacerUnmemoized);
