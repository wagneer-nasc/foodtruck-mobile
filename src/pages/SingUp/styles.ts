import styled from 'styled-components/native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { Platform } from 'react-native';

export const Container = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
    padding: 0 24px ${Platform.OS === 'android'? 150 : 40}px;

`;
export const Title = styled.Text`
    font-size: 24px;
    color: #f4ede8;
    font-family: 'RobotoSlab-Medium';
    margin: 64px 0 24px;  

`;
export const BackToSignIn = styled.TouchableOpacity` 
     justify-content: center;
     align-items: center;
     flex-direction: row;
     padding: 16px 0 ${16 + getBottomSpace()}px;
     border-top-width: 1px;
     border-color: #232129;
     background: #412d81;

`;

export const BackToSignInText = styled.Text`
    color: #f4ede8;
    font-size: 18px;
    font-family: 'RobotoSlab-Regular';
    margin-left: 16px;
`;
export const ButtonBackStoreList = styled.TouchableOpacity`
    margin-bottom: 45px;
    margin-right: 330px;
  
`;