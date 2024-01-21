import styled from '@emotion/native';
import {Meta, StoryObj} from '@storybook/react-native';
import React from 'react';
import {View} from 'react-native';

import {CheckedBoxIcon} from '../../icons/CheckedBox.icon';
import {CheckedRadioButtonIcon} from '../../icons/CheckedRadioButton.icon';
import {CrossIcon} from '../../icons/Cross.icon';
import {DisabledRadioButtonIcon} from '../../icons/DisabledRadioButton.icon';
import {ErrorIcon} from '../../icons/Error.icon';
import {EyeIcon} from '../../icons/Eye.icon';
import {EyeClosedIcon} from '../../icons/EyeClosed.icon';
import {IconType} from '../../icons/Icon.types';
import {InfoIcon} from '../../icons/Info.icon';
import {LeftArrowIcon} from '../../icons/LeftArrow.icon';
import {SuccessIcon} from '../../icons/Success.icon';
import {UncheckedBoxIcon} from '../../icons/UnCheckedBox.icon';
import {UncheckedRadioButtonIcon} from '../../icons/UncheckedRadioButton.icon';
import {WarningIcon} from '../../icons/Warning.icon';
import {theme} from '../../theme/theme';

import {Spacer} from '../components/Spacer/Spacer';
import {Typography} from '../components/Typography/Typography';
import {StoryPage} from '../storybook/StoryPage/StoryPage';
import {StorySection} from '../storybook/StorySection/StorySection';

const icons: IconType[] = [
  CheckedBoxIcon,
  CheckedRadioButtonIcon,
  CrossIcon,
  DisabledRadioButtonIcon,
  ErrorIcon,
  EyeIcon,
  EyeClosedIcon,
  InfoIcon,
  SuccessIcon,
  UncheckedBoxIcon,
  UncheckedRadioButtonIcon,
  WarningIcon,
  LeftArrowIcon,
];

const SingleIconContainer = styled.View({
  width: '25%',
  marginBottom: 25,
  alignItems: 'center',
});

const IconsContainer = styled.View({
  width: '100%',
  flexDirection: 'row',
  flexWrap: 'wrap',
});

const createIcon = (icon: IconType, index: number) =>
  React.createElement(icon, {
    key: index,
    size: 30,
    color: theme.colors.black,
  });

const IconStoryContent = () => (
  <StoryPage>
    <StorySection title="All icons" />
    <IconsContainer>
      {icons.map((icon, index) => {
        return (
          <SingleIconContainer key={icon.displayName}>
            {createIcon(icon, index)}
            <Spacer vertical={5} />
            <View>
              <Typography.P3Regular>
                {icon.displayName || ''}
              </Typography.P3Regular>
            </View>
          </SingleIconContainer>
        );
      })}
    </IconsContainer>
  </StoryPage>
);

const IconStoryMeta: Meta<typeof IconStoryContent> = {
  title: 'Boson/All Icons',
  component: IconStoryContent,
};

export default IconStoryMeta;

type IconStory = StoryObj<typeof IconStoryContent>;

export const iconStory: IconStory = {
  name: 'All Icons',
};
