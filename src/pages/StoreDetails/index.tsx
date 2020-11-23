import { useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, ScrollView, Dimensions, Linking } from 'react-native';
import Header from '../../components/Header';
import Icon from 'react-native-vector-icons/Feather';
import api from '../../service/api';

import {
    ImageList,
    ContainerTexto,
    Title,
    Address,
    ContainerDescription,
    Description,
    ContainerInfo, HoursDaysInfo, TextInfo, DeliveryInfo, ContainerWhatsapp

} from './styles';
import Button from '../../components/Button';
import { useAuth } from '../../auth/auth';

interface StoreDetailsRouteParams {
    id: string;
}
interface Store {
    id: string,
    name: string,
    address: string,
    is_delivery: string,
    description: string,
    opening_days: string,
    opening_hours: string,
    contact: string,
    images: Array<{
        id: string,
        url: string,
    }>;

}

const StoreDetails: React.FC = () => {
    const { user } = useAuth();
    const route = useRoute();
    const [store, setStore] = useState<Store>();
    const params = route.params as StoreDetailsRouteParams;
    
    useEffect(() => {
        api.get(`/stores/${params.id}`).then(response => {
            setStore(response.data);

        })
    }, [params.id]);
 
    function handleWhatssap() {
        const messageTextSendWhatsapp =
        'Olá acabei de ver seu anúncio no app FoodTruck...'
        Linking.openURL(`whatsapp://send?phone=${store?.contact}&text=${messageTextSendWhatsapp}`)
    }

    return (
        <>
            <Header
                welcome={true}
                buttonBack={true}
                nameUser={user ? user.name : ''}

            ></Header>

            <ScrollView style={{ flex: 1 }}>
                <View>
                    <ScrollView horizontal pagingEnabled >
                        {
                            store?.images.map(image => {
                                return (
                                    <ImageList
                                        style={{
                                            width: Dimensions.get('window').width,
                                        }}
                                        key={image.id}
                                        source={{ uri: image.url }}
                                    />
                                )
                            })
                        }

                    </ScrollView>
                </View>
                <ContainerTexto>
                    <Title>{store?.name}</Title>
                    <Address>{store?.address}</Address>

                    <ContainerDescription style={{ width: 380 /*Dimensions.get('window').width*/ }}>
                        <Description>{store?.description}</Description>
                    </ContainerDescription>

                </ContainerTexto>
                <ContainerInfo>

                    <HoursDaysInfo>
                        <Icon name="clock" size={25} color={'#f4ede8'} />

                        <TextInfo>{store?.opening_days} !</TextInfo>
                        <TextInfo>{store?.opening_hours} !</TextInfo>
                    </HoursDaysInfo>

                    <DeliveryInfo>
                        <Icon name="info" size={25} color={'#f4ede8'} />
                        {

                            store?.is_delivery == 'true' ?
                                <TextInfo>Trabalhamos com Delivery!</TextInfo>
                                : <TextInfo> Não Trabalhamos com Delivery!</TextInfo>

                        }
                    </DeliveryInfo>

                </ContainerInfo>
                <ContainerWhatsapp onPress={() => { handleWhatssap }}>
                    <Button>Whattsap</Button>
                </ContainerWhatsapp>

            </ScrollView>
        </>
    )
}
export default StoreDetails;