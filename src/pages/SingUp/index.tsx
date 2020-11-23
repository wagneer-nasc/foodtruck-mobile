import React, { useState } from 'react';
import {
    Alert,
    Image,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    View
} from 'react-native';
import Button from '../../components/Button';
import { useNavigation } from '@react-navigation/native';
import logoImg from '../../assets/logo.png';
import {
    Container,
    Title,
    BackToSignIn,
    BackToSignInText,
    ButtonBackStoreList
} from './styles';
import Input from '../../components/Input';
import api from '../../service/api';
import Icon from 'react-native-vector-icons/Feather';
import { useAuth } from '../../auth/auth';
import * as Yup from 'yup';

interface SignUpData {
    name: string;
    email: string;
    password: string;
}

const SignUp: React.FC = () => {
    const { signIn } = useAuth();
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    async function handleSingUp() {
        const data: SignUpData = {
            name: name,
            email: email,
            password: password,
        }
        try {

            const schema = Yup.object().shape({
                name: Yup.string()
                    .required('Nome é obrigatório'),
                email: Yup.string()
                    .required('E-mail é obrigatório')
                    .email('Digite um e-mail válido'),
                password: Yup.string().required('Senha é obrigatória'),
            });
            await schema.validate(data, { abortEarly: false });

            await api.post('/users', data).then(response => {
                signIn({
                    email: email,
                    password: password,
                })
                Alert.alert('Cadastro realizado com sucesso!')
                navigation.navigate('StoreList')

            });
        } catch (err) {
            if (err instanceof Yup.ValidationError) {
                err.inner.map((error) => {
                    return Alert.alert(error.message);

                })
            }

            return Alert.alert('Email já existe!')

        }
    }

    return (
        <>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                enabled
            >
                <ScrollView
                    keyboardShouldPersistTaps="handled"
                    contentContainerStyle={{ flex: 1 }}>
                    <Container>
                        <ButtonBackStoreList onPress={() => navigation.navigate('StoreList')}>
                            <Icon
                                size={35}
                                color={'#f4ede8'}
                                name="chevron-left" />
                        </ButtonBackStoreList>
                        <Image source={logoImg} />
                        <View>
                            <Title>Crie sua conta</Title>
                        </View>

                        <Input
                            value={name}
                            onChangeText={setName}
                            name="name"
                            placeholder="Nome"
                            returnKeyType="next"
                            onSubmitEditing={() => {

                            }}
                        />

                        <Input
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCorrect={false}
                            autoCapitalize="none"
                            name="email"
                            placeholder="E-mail"
                            returnKeyType="next"
                            onSubmitEditing={() => {

                            }}
                        />
                        <Input
                            value={password}
                            onChangeText={setPassword}
                            name="password"
                            placeholder="Senha"
                            secureTextEntry
                            textContentType="password"
                            returnKeyType="send"
                            onSubmitEditing={() => {
                                handleSingUp()

                            }}
                        />

                        <Button onPress={() => {
                            handleSingUp()
                        }}

                        >Cadastrar</Button>

                    </Container>
                </ScrollView>
            </KeyboardAvoidingView>
            <BackToSignIn onPress={() => { navigation.navigate('SignIn') }}>

                <BackToSignInText>Faça seu logon</BackToSignInText>
            </BackToSignIn>
        </>
    )
}

export default SignUp;