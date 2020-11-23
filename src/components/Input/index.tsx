import React, { useRef } from 'react';
import { TextInputProps } from 'react-native';
import { Container, TextInput } from './styles';

interface InputProps extends TextInputProps {
    name: string,
    height?: number,

}
const Input: React.FC<InputProps> = ({ name, height, ...rest }) => {
    const inputElementRef = useRef<any>(null)
    return (
        <Container
            style={height ? { height: height } : { height: 60 }}>
            <TextInput 
                keyboardAppearance="dark"
                placeholderTextColor="#666360"

                {...rest}
            />
        </Container>)
}

export default Input;