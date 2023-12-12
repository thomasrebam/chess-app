import {useNavigation} from '@react-navigation/native';
import {AuthenticatedNavigatorStackParamList} from './AuthenticatedNavigator/AuthenticatedNavigator.type';
import {Navigation} from './AuthenticatedNavigator/AuthenticatedNavigator';
import {Button} from '../../shared/boson/components/Button/Button';
import {Spacer} from '../../shared/views/components/Spacer/Spacer';
import {SafeAreaView, Text} from 'react-native';
import {TextInput} from '../../shared/boson/components/TextInput/TextInput';
import styled from '@emotion/native';
import {colors} from '../../shared/boson/theme/colors';
import {useState} from 'react';

export const MainPage = () => {
  const navigation =
    useNavigation<Navigation<AuthenticatedNavigatorStackParamList, 'Menu'>>();

  const [pgn, setPgn] = useState<string | undefined>(undefined);
  return (
    <SafeAreaView>
      <Spacer height={16} />
      <Button.Primary
        label="Analysis"
        onPress={() => {
          navigation.navigate('Analysis', {pgn: undefined});
        }}
      />
      <Spacer height={16} />
      <StyledText>Load PGN analysis</StyledText>
      <TextInput
        placeholder="Load a PGN here"
        onChangeText={event => setPgn(event)}
      />
      <Spacer height={4} />
      <Button.Primary
        label="Analyse PGN"
        onPress={() => {
          navigation.navigate('Analysis', {pgn});
        }}
      />
      <Spacer height={16} />
      <Button.Primary
        label="Test yourself"
        onPress={() => {
          navigation.navigate('Test');
        }}
      />
    </SafeAreaView>
  );
};

const StyledText = styled(Text)({
  color: colors.primary500,
});
