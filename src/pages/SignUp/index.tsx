import React, { useRef } from 'react';
import { Image, 
        KeyboardAvoidingView, 
        Platform,  
        ScrollView,
        TextInput 
    } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

import Input from "../../components/input";
import Button from "../../components/button";
import Icon from 'react-native-vector-icons/Feather';

import logoImg from '../../assets/logo.png';

import { Container, 
         Title, 
         BackToSignIn, 
         BackToSignInText } from './styles';

const SignUp: React.FC = () => {
    const formRef = useRef<FormHandles>(null)
    const navigation = useNavigation();
    const emailInputRef = useRef<TextInput>(null)
    const passwordInputRef = useRef<TextInput>(null)
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
                <Form ref={formRef} onSubmit={(data) => {console.log(data)}}>
                    <Input 
                        autoCapitalize="words"
                        name="name" 
                        icon="user" 
                        placeholder= "Nome"
                        returnKeyType="next"
                        onSubmitEditing={() => {
                            emailInputRef.current.focus()
                        }}
                        />
                    <Input 
                        ref={emailInputRef}
                        keyboardType="email-address"
                        autoCorrect={false}
                        autoCapitalize="none"
                        name="email" 
                        icon="mail" 
                        placeholder= "E-mail"
                        returnKeyType="next"
                        onSubmitEditing={() => {
                            passwordInputRef.current.focus()
                        }}
                        />
                    <Input 
                        ref={passwordInputRef}
                        secureTextEntry
                        name="password" 
                        icon="lock" 
                        placeholder= "Senha" 
                        textContentType="newPassword"
                        returnKeyType="send"
                        onSubmitEditing={()=> formRef.current.submitForm()}
                        />
                </Form>
                <Button onPress={()=> formRef.current.submitForm()}>Entrar</Button>

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