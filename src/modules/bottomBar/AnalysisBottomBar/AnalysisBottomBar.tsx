import styled from '@emotion/native';
import {TouchableOpacity, View} from 'react-native';
import {colors} from '../../../shared/boson/theme/colors';
import {Icon} from '../../../../assets/icons';
import {Spacer} from '../../../shared/views/components/Spacer/Spacer';

interface AnalysisBottomBarProps {
  onLeftArrowPress: () => void;
  onRightArrowPress: () => void;
}

export const AnalysisBottomBar = ({
  onLeftArrowPress,
  onRightArrowPress,
}: AnalysisBottomBarProps) => {
  return (
    <BottomBar>
      <TouchableOpacity onPress={onLeftArrowPress}>
        <Icon.RightArrow
          style={{transform: [{rotate: '180deg'}]}}
          color={colors.white}
          width={32}
          height={32}
        />
      </TouchableOpacity>
      <Spacer width={40} />
      <TouchableOpacity onPress={onRightArrowPress}>
        <Icon.RightArrow color={colors.white} width={32} height={32} />
      </TouchableOpacity>
    </BottomBar>
  );
};

const BottomBar = styled(View)({
  backgroundColor: colors.grey300,
  paddingVertical: 4,
  borderRadius: 4,
  flexDirection: 'row',
  justifyContent: 'space-between',
});
