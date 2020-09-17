import React from 'react';
import { Image, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Input from "../../components/input";
import Button from "../../components/button";
import Icon from 'react-native-vector-icons/Feather';

import logoImg from '../../assets/logo.png';

import { Container, 
         Title, 
         BackToSignIn, 
         BackToSignInText } from './styles';

const SignUp: React.FC = () => {
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
                <Title>Crie sua conta</Title>

                <Input name="name" icon="user" placeholder= "Nome"/>
                <Input name="email" icon="mail" placeholder= "E-mail"/>
                <Input name="password" icon="lock" placeholder= "Senha" />
                
                <Button onPress={()=>{console.log('Deu')}}>Entrar</Button>

            </Container>

            <BackToSignIn onPress={() => {navigation.goBack()}}>
                <Icon name="arrow-left" size={20} color="#fff" />
                <BackToSignInText>Voltar para o logon</BackToSignInText>
            </BackToSignIn>
         </ScrollView>
         </KeyboardAvoidingView>
        </>
    );
}

export default SignUp;