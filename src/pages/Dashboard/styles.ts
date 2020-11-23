import styled from 'styled-components/native';
import {getStatusBarHeight } from 'react-native-iphone-x-helper';
import { FlatList, RectButton } from 'react-native-gesture-handler';
import {Store} from './index';

export const Container = styled.View`
    flex: 1;
 `; 
 
export const StoreImage = styled.Image`
    width: 56px;
    height: 56px;
    border-radius: 28px;
`;

export const StoreFlatList = styled(FlatList as new () => FlatList<Store>)`
     padding: 10px 25px 16px;    
`; 

export const ContainerListInfo = styled(RectButton)`
    background: #412d81;
    border-radius: 20px;
    padding: 20px;
    align-items: center;
    margin-bottom: 10px;
    
`;
export const ImageStoreList = styled.Image`
    width: 200px;
    height: 200px;
    border-radius: 20px;
    
       
`;
export const TextoNameInfo = styled.Text`
    flex: 1;
    color: #f4ede8;
    font-family: 'RobotoSlab-Medium';
    font-size: 20px;
    margin-top: 10px;
     
`;
export const TextoInfo = styled.Text`
    color: #999591;
    font-family: 'RobotoSlab-Medium';
    font-size: 18px;
     
`;
export const ButtonDeleteStore= styled.TouchableOpacity ` 
    padding: 8px;
    padding-top: 8px;
    margin-top: 18px;
`;
export const ButtonDetails= styled.TouchableOpacity ` 
    padding: 8px;
    padding-top: 8px;
    margin-top: 18px;
`;
export const ButtonTextModalize = styled.Text`
    font-size: 20px;
    color: #f4ede8;
    font-family: 'RobotoSlab-Regular';
`;