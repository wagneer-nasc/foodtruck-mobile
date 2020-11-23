import React, { useRef } from 'react'; 
import { Container, HeaderContainer, HeaderTitle, UserName, ButtonBack, HeaderMenu, ButtonUserAuthenticated, ButtonUserNoAuthenticated, ButtonTextModalize } from './styles';
import Icon from 'react-native-vector-icons/Feather';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Modalize } from 'react-native-modalize';
import { useAuth } from '../../auth/auth';

interface HeaderProps {
    nameUser?: string, 
    icon?: string,
    buttonBack: boolean,
    welcome?: boolean,
}
const Header: React.FC<HeaderProps> = ({ nameUser,buttonBack, welcome }) => {
    const navigation = useNavigation();
    const modalizeRef = useRef<Modalize>(null);
    const { user, signOut } = useAuth();

    const onCloseModalize = () => {
        modalizeRef.current?.close();
    }

    const onOpenModalize = () => {
        modalizeRef.current?.open();
    };

    return (
        <>
            <Container>
                <HeaderContainer>
                    {buttonBack ?
                        <View>
                            <ButtonBack
                                onPress={() => navigation.goBack()}>
                                <Icon name="chevron-left" size={35} color={'#f4ede8'} />

                            </ButtonBack>
                        </View> :

                        undefined
                    }
                    <HeaderTitle>
                        {
                            welcome ? 'Bem vindo, \n' : ''
                        }
                        {
                            nameUser ? <UserName>{nameUser}</UserName> :
                                <UserName>Escolha seu FoodTruck!</UserName>
                        }

                    </HeaderTitle>

                    <HeaderMenu onPress={onOpenModalize}>
                        <Icon name="more-vertical" size={35} color={'#f4ede8'} />
                    </HeaderMenu>
                </HeaderContainer>

            </Container>
            {user ?
                <Modalize
                    ref={modalizeRef}
                    modalHeight={300}
                    modalStyle={{
                        borderColor: '#271544',
                        backgroundColor: '#412d81',

                    }}

                >
                    <ButtonUserAuthenticated>
                        <ButtonTextModalize onPress={() =>
                            (navigation.navigate('CreateStore'), onCloseModalize())}>
                            Cria uma Loja
                        </ButtonTextModalize>
                    </ButtonUserAuthenticated>
                    <ButtonUserAuthenticated>
                        <ButtonTextModalize onPress={() =>
                            (navigation.navigate('Dashboard'), onCloseModalize())}>
                            Minhas Lojas
                            </ButtonTextModalize>
                    </ButtonUserAuthenticated>
                    <ButtonUserAuthenticated onPress={signOut}>
                        <ButtonTextModalize>
                            Sair
                            </ButtonTextModalize>
                    </ButtonUserAuthenticated>

                </Modalize> :
                <Modalize
                    ref={modalizeRef}
                    modalHeight={300}
                    modalStyle={{
                        borderColor: '#271544',
                        backgroundColor: '#412d81',

                    }}
                >

                    <ButtonUserNoAuthenticated onPress={() =>
                        (navigation.navigate('SignUp'), onCloseModalize())}>
                        <ButtonTextModalize>
                            Crie uma conta
                            </ButtonTextModalize>
                    </ButtonUserNoAuthenticated>
                    <ButtonUserNoAuthenticated onPress={() =>
                        (navigation.navigate('SignIn'), onCloseModalize())}>
                        <ButtonTextModalize>
                            Faça seu login
                            </ButtonTextModalize>
                    </ButtonUserNoAuthenticated>

                </Modalize>
            }


        </>
    )
}
export default Header;