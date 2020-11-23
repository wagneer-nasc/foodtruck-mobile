import React, { useRef, useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, Text, Switch } from 'react-native';
import {
    Container,
    ContainerCreate,
    Title,
    ImageSelectContainer,
    ImageSelectDelete,
    ImageSelect,
    SwitchContainer,
    SwitchLabel,
    ButtonDeleteImage,
    ButtonTextModalize
} from './styles';
import * as Yup from 'yup';
import Input from '../../components/Input';
import Button from '../../components/Button';
import ImagePicker from 'react-native-image-picker';
import { ScrollView } from 'react-native-gesture-handler';
import Header from '../../components/Header';
import api from '../../service/api';
import { useAuth } from '../../auth/auth';
import { useNavigation } from '@react-navigation/native';
import { Modalize } from 'react-native-modalize';

interface CreateStoreData {
    name: string;
    address: string;
    description: string;
    opening_hours: string;
    opening_days: string;
    is_delivery: boolean;
    contact: string;
}
 
const CreateStore: React.FC = () => {
    const { user } = useAuth();
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [description, setDescription] = useState('');
    const [opening_hours, setOpening_hours] = useState('');
    const [opening_days, setOpening_days] = useState('');
    const [images, setImages] = useState<string[]>([]);
    const [is_delivery, setIs_Delivery] = useState(true);
    const [contact, setContact] = useState('');
    const [indexDeleteImage, setIndexDeleteImage] = useState<number>();
    const modalizeRef = useRef<Modalize>(null);
    const user_id = user.id;
    const navegation = useNavigation();

    const onCloseModalize = () => {
        modalizeRef.current?.close();
    }
    const onOpenModalize = (imageIndex: number) => {
        setIndexDeleteImage(imageIndex);
        modalizeRef.current?.open();
    };

    async function handleCreateStore() {
        const dataValidate: CreateStoreData = {
            name: name,
            address: address,
            description: description,
            opening_hours: opening_hours,
            opening_days: opening_days,
            is_delivery: is_delivery,
            contact: contact,

        }
        try {
            const schema = Yup.object().shape({
                name: Yup.string()
                    .required('Nome da loja é obrigatório'),
                address: Yup.string()
                    .required('Endereço da loja é obrigatório'),
                contact: Yup.string()
                    .required('WhatsApp da loja é obrigatório'),
                description: Yup.string()
                    .required('Descrição da loja é obrigatório'),
                opening_days: Yup.string()
                    .required('Dias de funcionamento é obrigatório'),
                opening_hours: Yup.string()
                    .required('Horarios de funcionamento é obrigatório'),

            });

            await schema.validate(dataValidate, { abortEarly: false });
            if (images.length === 0) {
                return Alert.alert('Adicione pelo menos uma imagem!')
            }
            const data = new FormData();
            data.append('name', name);
            data.append('address', address);
            data.append('description', description);
            data.append('opening_hours', opening_hours);
            data.append('opening_days', opening_days);
            data.append('is_delivery', is_delivery);
            data.append('contact', contact);
            data.append('user_id', user_id);
            images.forEach((image, index) => {
                data.append('images', {
                    name: `image_${index}.jpg`,
                    type: 'image/jpg',
                    uri: image,
                })
            })

            await api.post('stores', data).then((response) => { 
                navegation.navigate('Dashboard');
            });


        } catch (err) {
            if (err instanceof Yup.ValidationError) {
                err.inner.map((error, index) => {
                    if (index === 0) {
                        Alert.alert(error.message);
                        return;
                    }

                })
            }
            return Alert.alert('voce so pode add 2 lojas por email ...');
        }
    }

    async function handleSelectImage() {
        if (images.length === 3) {
            return Alert.alert('Voce só pode adicionar 3 imagens ...');
        }
        ImagePicker.showImagePicker(
            {
                title: 'Selecione uma imagem',
                cancelButtonTitle: 'Cancelar',
                takePhotoButtonTitle: 'Usar camera',
                chooseFromLibraryButtonTitle: 'Escolher da galeria',
                quality: 1,
                mediaType: "photo",

            }, (response => {
                if (response.didCancel) {
                    return;
                }
                if (response.error) {
                    Alert.alert('Erro ao selecionar uma imagem')
                    return;
                }
                const image = response.uri;
                setImages([...images, image])


            }))
    }

    function handleSelectImageDelete() {
        images.splice(indexDeleteImage ? indexDeleteImage : -1, 1);
        setImages([...images])
        onCloseModalize();
    }

    return (
        <>
            <Container>
                <Header
                    welcome={true}
                    buttonBack={true}
                    nameUser={user.name}
                />

                <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                    enabled
                >
                    <ScrollView
                        keyboardShouldPersistTaps="handled"
                    >
                        <ContainerCreate>

                            <Title>Cadastro Store</Title>
                            <Input
                                value={name}
                                onChangeText={setName}
                                name="name"
                                placeholder="Nome da loja"

                            >
                            </Input>
                            <Input
                                value={address}
                                onChangeText={setAddress}
                                name="address"
                                placeholder="Endereço da loja"
                            >
                            </Input>
                            <Input
                                value={contact}
                                onChangeText={setContact}
                                name="whatsapp"
                                keyboardType="numeric"
                                placeholder="Seu WhatsApp"
                            >
                            </Input>
                            <Input
                                value={description}
                                onChangeText={setDescription}
                                height={160}
                                multiline
                                name="description"
                                placeholder="Descrição"
                            >
                            </Input>

                            <ImageSelectContainer>
                                {images.map((imag, index) => {
                                    return (
                                        <ImageSelectDelete onPress={() => {
                                            const imageIndex = images.findIndex(imageArray => imageArray == imag);
                                            onOpenModalize(imageIndex);
                                        }
                                        }>
                                            <ImageSelect
                                                key={index}
                                                source={{ uri: imag }}
                                            />
                                        </ImageSelectDelete>
                                    );
                                })}
                            </ImageSelectContainer>

                            <Button onPress={handleSelectImage}>Imagens</Button>
                            <Text>Ex: Domingo a domingo, exceto sexta.</Text>
                            <Input
                                value={opening_days}
                                onChangeText={setOpening_days}
                                name="opening_days"
                                placeholder="Dias de funcionamento"
                            >
                            </Input>
                            <Text>Ex: 08h as 19h</Text>
                            <Input
                                value={opening_hours}
                                onChangeText={setOpening_hours}
                                name="opening_hours"
                                placeholder="Horário de funcionamento"
                            >
                            </Input>
                            <SwitchContainer>

                                <SwitchLabel>Tem serviço de delivery ?</SwitchLabel>
                                <Switch
                                    thumbColor='#fff'
                                    trackColor={{ false: '#ccc', true: '#39cc83' }}
                                    value={is_delivery}
                                    onValueChange={setIs_Delivery}
                                >
                                </Switch>
                            </SwitchContainer>
                            <Button onPress={() => handleCreateStore()}
                            >Cadastrar</Button>
                        </ContainerCreate>
                    </ScrollView>
                </KeyboardAvoidingView>
                <Modalize
                    ref={modalizeRef}
                    modalHeight={100}
                    modalStyle={{
                        borderColor: '#271544',
                        backgroundColor: '#412d81',

                    }}

                >
                    <ButtonDeleteImage>
                        <ButtonTextModalize onPress={() => handleSelectImageDelete()}>
                            Deletar imagem
                        </ButtonTextModalize>
                    </ButtonDeleteImage>

                </Modalize>
            </Container>

        </>
    )
}
export default CreateStore