import styled from 'styled-components/native';
import {getStatusBarHeight } from 'react-native-iphone-x-helper';

export const Container = styled.View`
   
 `; 
export const HeaderContainer = styled.View`
    padding: 24px;
    padding-top: ${getStatusBarHeight() + 24}px;
    background: #412d81;

    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`; 
export const HeaderTitle = styled.Text`
    color: #f4ede8;
    font-size: 20px;
    font-family: 'RobotoSlab-Regular';
    line-height: 28px;
`; 

export const UserName = styled.Text`
    
     color: #f4ede8;
     font-family: 'RobotoSlab-Medium';
`; 
export const HeaderMenu = styled.TouchableOpacity`
`;
export const StoreImage = styled.Image`
    width: 56px;
    height: 56px;
    border-radius: 28px;
`;
export const ButtonBack = styled.TouchableOpacity `
   
`;
export const ButtonUserAuthenticated= styled.TouchableOpacity ` 
    padding: 10px;
    padding-top: 8px;
    margin-top: 18px;
 
`;
export const ButtonUserNoAuthenticated= styled.TouchableOpacity ` 
    padding: 8px;
    padding-top: 8px;
    margin-top: 18px;
`;
export const ButtonTextModalize = styled.Text`
    font-size: 20px;
    color: #f4ede8;
    font-family: 'RobotoSlab-Regular';
`;
 