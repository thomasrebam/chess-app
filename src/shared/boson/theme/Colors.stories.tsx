import styled from '@emotion/native';
import {Meta, StoryObj} from '@storybook/react-native';

import {Spacer} from '../../components/Spacer/Spacer';
import {Typography} from '../../components/Typography/Typography';
import {StoryPage} from '../../storybook/StoryPage/StoryPage';
import {StorySection} from '../../storybook/StorySection/StorySection';
import {theme} from '../../theme/theme';

const ColorStoryContent = () => (
  <StoryPage>
    <StorySection title="Colors" />
    {Object.entries(theme.colors).map(([colorName, colorValue]) => {
      return (
        <ColorRow key={colorName}>
          <ColorRectangle color={colorValue} />
          <Spacer horizontal={16} />
          <Typography.P2Regular>{colorName}</Typography.P2Regular>
        </ColorRow>
      );
    })}
  </StoryPage>
);

const ColorRow = styled.View({
  justifyContent: 'flex-start',
  paddingVertical: 4,
  flexDirection: 'row',
  alignItems: 'center',
});

const ColorRectangle = styled.View<{color: string}>(({color}) => ({
  height: 32,
  width: 100,
  backgroundColor: color,
}));

const ColorStoryMeta: Meta<typeof ColorStoryContent> = {
  title: 'Boson/Colors',
  component: ColorStoryContent,
};

export default ColorStoryMeta;

type ColorStory = StoryObj<typeof ColorStoryContent>;

export const colorStory: ColorStory = {
  name: 'Colors',
};
