import React, { useState } from 'react';
import {
    Alert, Image, KeyboardAvoidingView,
    Platform, ScrollView, View
} from 'react-native';
import Button from '../../components/Button';
import { useNavigation } from '@react-navigation/native';
import logoImg from '../../assets/logo.png';
import {
    Container, Title, CreateAccountButton,
    CreateAccountButtonText, ForgotPassword,
    ForgotPasswordText, ButtonBackStoreList,
} from './styles';
import Input from '../../components/Input';
import { useAuth } from '../../auth/auth';
import Icon from 'react-native-vector-icons/Feather';
import * as Yup from 'yup';

interface SignInData {
    email: string;
    password: string;
}

const SignIn: React.FC = () => {
    const { signIn } = useAuth();
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function handleSignIn() {
        try {
            const data: SignInData = {
                email,
                password,
            }

            const schema = Yup.object().shape({
                email: Yup.string()
                    .required('E-mail é obrigatório')
                    .email('Digite um e-mail válido'),
                password: Yup.string().required('Senha é obrigatória'),
            });
            await schema.validate(data, { abortEarly: false });

            await signIn({
                email: email,
                password: password,
            })
            navigation.navigate('StoreList');
        } catch (err) {
            if (err instanceof Yup.ValidationError) {
                err.inner.map((error) => {
                    return Alert.alert(error.message);

                })
            }
            return Alert.alert(
                'Erro na autenticação',
                'Ocorreu um error ao fazer login, verifique as credenciais.',
            );
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
                            <Title>Faça seu login</Title>
                        </View>

                        <Input

                            value={email}
                            onChangeText={setEmail}
                            autoCorrect={false}
                            autoCapitalize="none"
                            keyboardType="email-address"
                            name="email"
                            placeholder="E-mail"
                            returnKeyType="next"
                            onSubmitEditing={() => {
                                // passwordInputRef.current?.focus();
                            }}
                        />
                        <Input
                            secureTextEntry
                            returnKeyType="send"
                            onSubmitEditing={() => { handleSignIn() }}
                            name="password"
                            value={password}
                            onChangeText={setPassword}
                            placeholder="Senha"
                            textContentType="newPassword"
                        />
                        <Button onPress={() => {
                            handleSignIn()
                        }}
                        >
                            Entrar
                            </Button>

                        <ForgotPassword onPress={() => { handleSignIn() }}>
                            <ForgotPasswordText>Esqueci minha senha</ForgotPasswordText>
                        </ForgotPassword>
                    </Container>

                </ScrollView>
            </KeyboardAvoidingView>
            <CreateAccountButton onPress={() => { navigation.navigate('SignUp') }}>

                <CreateAccountButtonText>Criar uma conta</CreateAccountButtonText>
            </CreateAccountButton>
        </>
    )
}

export default SignIn;