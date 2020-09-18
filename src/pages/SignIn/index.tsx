import React, { useCallback, useRef } from 'react';
import { Image, 
        KeyboardAvoidingView, 
        Platform, 
        ScrollView,
        TextInput,
        Alert
    } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import { useAuth } from '../../hooks/AuthContext';
import * as Yup from 'yup'


import Input from "../../components/input";
import Button from "../../components/button";
import getValidationErrors from '../../utils/getValidationsErrors'
import Icon from 'react-native-vector-icons/Feather';

import logoImg from '../../assets/logo.png';

import { Container, 
         Title, 
         ForgotPassword, 
         ForgotPasswordText, 
         CreateAccountButton, 
         CreateAccountButtonText } from './styles';

interface SignInFormData {
    email: string;
    password: string
}

const SignIn: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const passwordInputRef = useRef<TextInput>(null);
    const navigation = useNavigation();
    const { signIn } = useAuth();;

    const handleSignIn = useCallback(
        async (data: SignInFormData) => {
          try {
            // eslint-disable-next-line no-unused-expressions
            formRef.current?.setErrors({});
            const schema = Yup.object().shape({
              email: Yup.string()
                .required('Digite um email válido')
                .email('Digite um email válido'),
              password: Yup.string().required('Senha obrigatória'),
            });
            await schema.validate(data, {
              abortEarly: false,
            });
           await signIn({
              email: data.email,
              password: data.password,
            });
    
          } catch (err) {
            if (err instanceof Yup.ValidationError) {
              console.log(err);
              const errors = getValidationErrors(err);
              // eslint-disable-next-line no-unused-expressions
              formRef.current?.setErrors(errors);
    
              return;
            }
    
            Alert.alert(
                'Erro na autenticação',
                'Verifique as credenciais'
            );
          }
        },
        [signIn]
      );

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

                <Form ref={formRef} onSubmit={handleSignIn}>
                    <Input 
                        autoCorrect={false}
                        autoCapitalize="none"
                        keyboardType="email-address"
                        name="email" 
                        icon="mail" 
                        placeholder= "E-mail"
                        onSubmitEditing={() => {
                            passwordInputRef.current.focus();
                        }}
                        />
                    <Input 
                        ref={passwordInputRef}
                        name="password" 
                        icon="lock" 
                        placeholder= "Senha" 
                        secureTextEntry
                        returnKeyType="send"
                        onSubmitEditing={()=>{
                            formRef.current.submitForm();
                        }}
                        />
                    
                </Form>
                <Button onPress={()=>{
                        formRef.current.submitForm();
                    }}>Entrar</Button>
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