import React from 'react';
import { ButtonText, Container } from './styles';

import { RectButtonProperties } from 'react-native-gesture-handler';

interface ButtonProps extends RectButtonProperties {
    children: string,
    color?: string,
}

const Button: React.FC<ButtonProps> = ({ children, color, ...rest }) => {
    return (
        <Container {...rest}>

            <ButtonText>
                {children}
            </ButtonText>
        </Container>)
}

export default Button;