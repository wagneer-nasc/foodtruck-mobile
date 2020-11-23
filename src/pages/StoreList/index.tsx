import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import api from '../../service/api';

import {
    Container,
    StoreFlatList,
    ContainerListInfo,
    ImageStoreList,
    TextoInfo,
    TextoNameInfo
} from './styles';
import Header from '../../components/Header';

export interface Store {
    id: string,
    name: string,
    address: string,
    is_delivery: string,
    description: string,
    opening_days: string,
    opening_hours: string,
    contact: string,
    images: [{
        id: string,
        url: string,
    }]

}

const StoreList: React.FC = () => {
    const [stores, setStores] = useState<Store[]>([]);
    const navigation = useNavigation();

    useEffect(() => {
        api.get('/stores').then(response => {
            setStores(response.data);

        });
    }, []); 
    function handleNavigateToStoreDetais(id: string) {
        navigation.navigate('StoreDetails', { id });
    }

    return (
        <Container>
            <Header
                welcome={true}
                buttonBack={false}
            >
            </Header>
            {stores !== null && (
                <StoreFlatList
                    data={stores}
                    keyExtractor={(store: Store) => store.id}
                    renderItem={({ item }: { item: Store }) => (
                        <>
                            <ContainerListInfo onPress={() => handleNavigateToStoreDetais(item.id)}>
                                <ImageStoreList source={{ uri: item.images[0].url }} />
                                <TextoNameInfo>{item.name}</TextoNameInfo>
                                <TextoInfo>{item.address}</TextoInfo>
                                <TextoInfo>{item.opening_days}</TextoInfo>
                                <TextoInfo>{item.opening_hours}</TextoInfo>
                                <TextoInfo>{item.contact}</TextoInfo>
                                {item.is_delivery == 'true' ? <TextoInfo>Delivery : Sim</TextoInfo> :
                                    <TextoInfo>Delivery : Não</TextoInfo>
                                }
                            </ContainerListInfo>
                        </>
                    )}
                />
            )}


        </Container>

    )
}

export default StoreList;