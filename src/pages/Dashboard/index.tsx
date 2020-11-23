import React, { useEffect, useRef, useState } from 'react';
import { useNavigation, } from '@react-navigation/native';
import api from '../../service/api';
import Header from '../../components/Header';
import { useAuth } from '../../auth/auth';
import { Modalize } from 'react-native-modalize';
import {
    Container,
    StoreFlatList,
    ContainerListInfo,
    ImageStoreList,
    TextoInfo,
    TextoNameInfo,
    ButtonDeleteStore,
    ButtonTextModalize,
    ButtonDetails,
} from './styles'; 

export interface Store {
    id: string,
    name: string,
    address: string,
    is_delivery: string,
    description: string,
    opening_days: string,
    opening_hours: string,
    images: [{
        id: string,
        url: string,
    }]

}

const Dashboard: React.FC = () => {
    const { user } = useAuth();
    const modalizeRef = useRef<Modalize>(null);
    const navigation = useNavigation();
    const [stores, setStores] = useState<Store[]>([]);
    const [id, setIdStoreSelect] = useState('');
 
    useEffect(() => {
        api.get(`/stores/user/${user.id}`).then(response => {
            setStores(response.data);
        })
    }, []);

    const onCloseModalize = () => {
        modalizeRef.current?.close();
    }

    const onOpenModalize = (id: string) => {
        setIdStoreSelect(id);
        modalizeRef.current?.open();
    };

    function handleNavigateToStoreDetais() {
        navigation.navigate('StoreDetails', { id });
    }
    async function handleDeleteStore() {
        const updatedStores = stores.filter(store => store.id !== id);
        setStores(updatedStores)
        await api.delete(`/stores/${id}`);
    }

    return (
        <Container>
            <Header
                welcome={false}
                buttonBack={true}
                nameUser="Minha loja"
            >

            </Header>
            <StoreFlatList
                data={stores}
                keyExtractor={(store: Store) => store.id}
                renderItem={({ item }: { item: Store }) => (
                    <>
                        <ContainerListInfo onPress={() => onOpenModalize(item.id)}>
                            <ImageStoreList source={{ uri: item.images[0].url }} />
                            <TextoNameInfo>{item.name}</TextoNameInfo>
                            <TextoInfo>{item.address}</TextoInfo>
                            <TextoInfo>{item.opening_days}</TextoInfo>
                            <TextoInfo>{item.opening_hours}</TextoInfo>
                            {item.is_delivery == 'true' ? <TextoInfo>Delivery : Sim</TextoInfo> :
                                <TextoInfo>Delivery : Não</TextoInfo>
                            }
                        </ContainerListInfo>
                    </>
                )}
            />
            <Modalize
                ref={modalizeRef}
                modalHeight={300}
                modalStyle={{
                    borderColor: '#271544',
                    backgroundColor: '#412d81',

                }}>
                <ButtonDeleteStore onPress={() => (handleDeleteStore(), onCloseModalize())}>
                    <ButtonTextModalize>Excluir esta loja</ButtonTextModalize>
                </ButtonDeleteStore>
                <ButtonDetails onPress={() => (handleNavigateToStoreDetais(), onCloseModalize())}>
                    <ButtonTextModalize>Detalhe esta loja</ButtonTextModalize>
                </ButtonDetails>

            </Modalize>

        </Container>

    )
}

export default Dashboard;