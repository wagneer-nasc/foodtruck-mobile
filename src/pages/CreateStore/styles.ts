import styled from 'styled-components/native';
import {getStatusBarHeight } from 'react-native-iphone-x-helper';

export const Container = styled.View`
    flex: 1;
 `; 
  
export const ContainerCreate = styled.View`
    align-items: center;
    padding: 20px;
      
`;
export const Title = styled.Text`
    color: #f4ede8;
    font-family: 'RobotoSlab-Regular';
    margin-bottom: 10px;
    font-size: 20px;
`;

export const ImageSelectContainer= styled.View`
    flex-direction: row;
`;

export const ImageSelect = styled.Image`
    width: 65px;
    height: 65px;
    border-radius: 20px;
    margin-bottom: 32px;
    margin-right: 6px;
    margin-left: 6px;
`;
export const SwitchContainer = styled.View`
     flex-direction: row; 
     padding-bottom: 8px;
     padding-top: 8px;
`;
export const SwitchLabel = styled.Text`
     padding-right: 150px;

`;
export const ImageSelectDelete= styled.TouchableOpacity`
    
`;

export const ButtonDeleteImage = styled.TouchableOpacity ` 
    padding: 8px;
    padding-top: 8px;
    margin-top: 18px;
`;
export const ButtonTextModalize = styled.Text`
    font-size: 20px;
    color: #f4ede8;
    font-family: 'RobotoSlab-Regular';
`;
 
 