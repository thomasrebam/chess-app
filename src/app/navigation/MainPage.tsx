import {useNavigation} from '@react-navigation/native';
import {AuthenticatedNavigatorStackParamList} from './AuthenticatedNavigator/AuthenticatedNavigator.type';
import {Navigation} from './AuthenticatedNavigator/AuthenticatedNavigator';
import {Button} from '../../shared/views/utils/components/Button/Button';
import {Spacer} from '../../shared/views/components/Spacer/Spacer';
import {SafeAreaView, Text} from 'react-native';
import {TextInput} from '../../shared/views/utils/components/TextInput/TextInput';
import styled from '@emotion/native';
import {colors} from '../../shared/views/utils/theme/colors';
import {useState} from 'react';

export const MainPage = () => {
  const navigation =
    useNavigation<Navigation<AuthenticatedNavigatorStackParamList, 'Menu'>>();

  const [pgn, setPgn] = useState<string | undefined>(undefined);
  return (
    <SafeAreaView>
      <Spacer height={16} />
      <Button
        label="New analysis"
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
      <Button
        label="PGN analysis"
        onPress={() => {
          navigation.navigate('Analysis', {pgn});
        }}
      />
      <Spacer height={16} />
      <Button
        label="Modify analysis"
        onPress={() => {
          navigation.navigate('Modify Analysis');
        }}
      />
      <Spacer height={16} />
      <Button
        label="Test yourself"
        onPress={() => {
          navigation.navigate('Choose Repertoire');
        }}
      />
    </SafeAreaView>
  );
};

const StyledText = styled(Text)({
  color: colors.primary500,
});
