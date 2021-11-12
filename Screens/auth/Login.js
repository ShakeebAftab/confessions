import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, TextInput, Text, TouchableWithoutFeedback, Keyboard, Platform, KeyboardAvoidingView } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'
import axios from 'axios';

//  Firebase Setup
import * as firebase from 'firebase';
import firebaseConfig from '../../config';
if (!firebase.apps.length) { firebase.initializeApp(firebaseConfig); }

//  Custom Components
import Card from '../../Components/Card';
import AuthButton from '../../Components/AuthButton';

//  Functions
import IsEmpty from '../../Functions/IsEmpty'
import PassLengthCheck from '../../Functions/PassLengthCheck'
import ErrorMessage from '../../Functions/ErrorMessage'
import { AppLoading } from 'expo';

//  Context
import { DataContext } from '../../Context'

const Login = ({ navigation }) => {
    //  States
    const [emailText, setEmailText] = useState('')
    const [passwordText, setPasswordText] = useState('')
    const [errorMsg, setErrorMsg] = useState('')
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)

    // Getting Input
    const onChangeEmailHandler = (enteredText) => setEmailText(enteredText)
    const onChangePasswordHandler = (enteredText) => setPasswordText(enteredText);

    //  Getting the userName
    const getUserName = async () => {
        try {
            const res = await axios.get(`https://us-central1-projectconfession-50eb6.cloudfunctions.net/api/user/${emailText.toLowerCase()}`)
            const data = res.data
            return data
        } catch (error) {
            console.log(error)
        }
        return
    }


    // Handling login Loading
    const loginLoadingHandler = () => {
        if (!loading) {
            return <AppLoading startAsync={loginHandler} onFinish={() => setLoading(true)} />
        }
    }


    //   Handling Login
    const loginHandler = async () => {
        try {
            const emailCheck = IsEmpty(emailText)
            const passwordCheck = IsEmpty(passwordText)
            const lengthCheck = PassLengthCheck(passwordText)
            if (emailCheck || passwordCheck || lengthCheck) {
                setError(true)
                setErrorMsg(`All fields are required to be filled`)
            } else {
                await AsyncStorage.setItem('@email', emailText)
                const name = await getUserName()
                await AsyncStorage.setItem('@userName', name)
                await firebase.auth().signInWithEmailAndPassword(emailText, passwordText)
            }
        } catch (err) {
            setError(true);
            await AsyncStorage.removeItem('@email')
            await AsyncStorage.removeItem('@userName')
            let msg = ErrorMessage(err.code)
            msg == '' ? setErrorMsg('Email and Password is wrong') : setErrorMsg(msg)
        }
        Keyboard.dismiss()
        setEmailText('')
        setPasswordText('')
    }


    useEffect(() => {
        setError(false)
        setErrorMsg('')
    }, [])



    const errorComponent = (
        <Card styles={style.card}>
            <Text>{errorMsg}</Text>
        </Card>)
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={style.parent}>
            {/* <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset='50' style={style.parent}> */}
                {error && errorComponent}
                <Card styles={style.card}>
                    <Text style={style.labels}>Email</Text>
                    <Card styles={style.childCard}>
                        <TextInput placeholder='Please enter your email'
                            onChangeText={onChangeEmailHandler}
                            value={emailText}
                            autoCapitalize={false}
                            autoCorrect={false}
                            keyboardType={"email-address"}
                            textContentType={"emailAddress"}
                        />
                    </Card>
                    <Text style={style.labels}>Password</Text>
                    <Card styles={style.childCard}>
                        <TextInput placeholder='Please enter your password'
                            onChangeText={onChangePasswordHandler}
                            value={passwordText}
                            autoCapitalize={false}
                            autoCorrect={false}
                            textContentType={"password"}
                            secureTextEntry={true} />
                    </Card>
                    <AuthButton title='Login' onPress={loginHandler} />
                    <AuthButton title="Don't have a account? Sign Up" onPress={() => navigation.navigate('Sign Up')} />
                    <AuthButton title="Reset Password" onPress={() => navigation.navigate('Recover')} />
                </Card>
                {/* </KeyboardAvoidingView> */}
            </View >
        </TouchableWithoutFeedback>
    )
}

const style = StyleSheet.create({
    parent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: '5%'
    },
    card: {
        ...Platform.select({
            ios: {
                borderWidth: 1,
                borderColor: '#d92702'
            },
            android: {
                borderWidth: 0.2,
            }
        }),
        borderRadius: 20
    },
    labels: {
        fontSize: 16,
        marginVertical: '1%',
        marginHorizontal: '4%'
    },
    childCard: {
        ...Platform.select({
            ios: {
                borderWidth: 1,
                borderColor: '#d92027'
            },
            android: {
                borderWidth: 0.2,
                elevation: 0
            }
        }),
        borderRadius: 20
    },
    textSwitch: {
        textAlign: 'center',
        color: '#d92027'
    }
})

export default Login;