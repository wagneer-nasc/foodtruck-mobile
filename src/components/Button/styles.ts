import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled(RectButton)`
    width: 100%;
    height: 60px;
    border-radius: 20px;
    background: #412d81;
    padding: 16px;
    justify-content: center;
    align-items: center;
    margin-bottom: 8px;
    
`;

export const ButtonText = styled.Text`
    color: #f4ede8;
    font-size: 16px;
    font-family: 'RobotoSlab-Medium'
   

`;