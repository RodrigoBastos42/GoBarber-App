import React from 'react';
import { Image, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Input from "../../components/input";
import Button from "../../components/button";
import Icon from 'react-native-vector-icons/Feather';

import logoImg from '../../assets/logo.png';

import { Container, 
         Title, 
         ForgotPassword, 
         ForgotPasswordText, 
         CreateAccountButton, 
         CreateAccountButtonText } from './styles';

const SignIn: React.FC = () => {
    const navigation = useNavigation();

    return (
        <>
         <KeyboardAvoidingView
            style={{flex: 1}}
            behavior={Platform.OS ==='ios' ? 'padding' : undefined}
            enabled
         >
         <ScrollView
            keyboardShouldPersistTaps="handled"
            contentContainerStyle= {{ flex: 1}}>
         <Container>
                <Image source={logoImg} />
                <Title>Faça seu logon</Title>

                <Input name="email" icon="mail" placeholder= "E-mail"/>
                <Input name="password" icon="lock" placeholder= "Senha" />
                
                <Button onPress={()=>{console.log('Deu')}}>Entrar</Button>

                <ForgotPassword onPress={() => {}}>
                    <ForgotPasswordText>Esqueci minha senha</ForgotPasswordText>
                </ForgotPassword>

            </Container>

            <CreateAccountButton onPress={()=>{navigation.navigate('SignUp')}}>
                <Icon name="log-in" size={20} color="#ff9000" />
                <CreateAccountButtonText>Criar uma conta</CreateAccountButtonText>
            </CreateAccountButton>
         </ScrollView>
         </KeyboardAvoidingView>
        </>
    );
}

export default SignIn;