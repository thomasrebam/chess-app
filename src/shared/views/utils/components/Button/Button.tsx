import styled from '@emotion/native';
import {Pressable, Text, View} from 'react-native';
import {Spacer} from '../../../components/Spacer/Spacer';

export type ButtonProps = {
  onPress: () => void;
  label: string;
};

export const Button = ({onPress, label}: ButtonProps) => {
  return (
    <Pressable onPress={onPress}>
      <Container>
        <Spacer height={8} />
        <Text>{label || ''}</Text>
        <Spacer height={8} />
      </Container>
    </Pressable>
  );
};

const Container = styled(View)(() => ({
  alignItems: 'center',
  flexDirection: 'row',
  justifyContent: 'center',
  backgroundColor: '#e3c099',
  borderRadius: 10,
  padding: 10,
}));
