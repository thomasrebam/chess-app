import styled from '@emotion/native';
import {
  SafeAreaView,
  TextInput as RNTextInput,
  TextInputProps,
} from 'react-native';

export const TextInput = ({
  placeholder,
  onChangeText,
  value,
  focusable,
}: TextInputProps) => {
  return (
    <SafeAreaView>
      <StyledTextInput
        placeholder={placeholder}
        onChangeText={onChangeText}
        value={value}
        focusable={focusable}
      />
    </SafeAreaView>
  );
};

const StyledTextInput = styled(RNTextInput)({
  backgroundColor: 'white',
  borderRadius: 8,
  padding: 8,
});
