import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TextInput, Text, TouchableWithoutFeedback, Keyboard, Platform, KeyboardAvoidingView } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'
import axios from 'axios'


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

const SignUp = ({ navigation }) => {
    //  States
    const [nameText, setNameText] = useState('')
    const [emailText, setEmailText] = useState('')
    const [passwordText, setPasswordText] = useState('')
    const [confirmPasswordText, setConfirmPasswordText] = useState('')
    const [error, setError] = useState(false)
    const [errorMsg, setErrorMsg] = useState('')

    // TextHandlers
    const nameTextHandler = (enterText) => setNameText(enterText)
    const emailTextHandler = (enteredText) => setEmailText(enteredText)
    const passwordTextHandler = (enteredText) => setPasswordText(enteredText)
    const confirmPasswordTextHandler = (enteredText) => setConfirmPasswordText(enteredText)

    // Axios Request
    const dataBaseSignUp = async () => {
        try {
            const res = await axios({
                method: 'POST',
                url: `https://us-central1-projectconfession-50eb6.cloudfunctions.net/api/signup`,
                data: {
                    email: emailText,
                    password: passwordText,
                    userName: nameText
                }
            })
            console.log(res.data)
        } catch (err) {
            console.log(err)
        }
    }

    //  Sign Up Button Handler
    const signUpHandler = async () => {
        try {
            const nameCheck = IsEmpty(nameText);
            const confirmPasswordCheck = IsEmpty(confirmPasswordText);
            const emailCheck = IsEmpty(emailText)
            const passwordCheck = IsEmpty(passwordText)
            if (emailCheck || passwordCheck || nameCheck || confirmPasswordCheck) {
                setError(true)
                setErrorMsg(`All fields are required to be filled`)
            } else {
                if (passwordText != confirmPasswordText) {
                    setError(true)
                    setErrorMsg("Hey! Superman, Your passwords don't match")
                } else {
                    await AsyncStorage.setItem('@email', emailText)
                    await AsyncStorage.setItem('@userName', nameText)
                    await firebase.auth().createUserWithEmailAndPassword(emailText, passwordText)
                    await dataBaseSignUp()
                }
            }

        } catch (err) {
            setError(true);
            await AsyncStorage.removeItem('@email')
            await AsyncStorage.removeItem('@userName')
            let msg = ErrorMessage(err.code)
            msg == '' ? setErrorMsg('Internal Server error please try again.') : setErrorMsg(msg)
        }
        Keyboard.dismiss()
        setEmailText('')
        setPasswordText('')
        setConfirmPasswordText('')
        setNameText('')
    }

    // Real Name Alert
    const onPressHandler = () => {
        return (
            alert('This name would be used in comments and if you CHOOSE to post with your real name')
        )
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
                    <Text style={style.labels}>Real Name</Text>
                    <Card styles={style.childCard}>
                        <TextInput placeholder='Please enter your REAL name'
                            onFocus={onPressHandler}
                            onChangeText={nameTextHandler}
                            value={nameText}
                            autoCorrect={false}
                            enablesReturnKeyAutomatically={true}
                            spellCheck={false} />
                    </Card>
                    <Text style={style.labels}>Email</Text>
                    <Card styles={style.childCard}>
                        <TextInput placeholder='Please enter your email'
                            onChangeText={emailTextHandler}
                            value={emailText}
                            autoCapitalize={false}
                            autoCorrect={false}
                            keyboardType={"email-address"}
                            textContentType={"emailAddress"} />
                    </Card>
                    <Text style={style.labels}>Password</Text>
                    <Card styles={style.childCard}>
                        <TextInput placeholder='Please enter your password'
                            onChangeText={passwordTextHandler}
                            value={passwordText}
                            autoCapitalize={false}
                            autoCorrect={false}
                            textContentType={"password"}
                            secureTextEntry={true} />
                    </Card>
                    <Text style={style.labels}>Confirm Password</Text>
                    <Card styles={style.childCard}>
                        <TextInput placeholder='Please re-enter your password'
                            onChangeText={confirmPasswordTextHandler}
                            value={confirmPasswordText}
                            autoCapitalize={false}
                            autoCorrect={false}
                            textContentType={"password"}
                            secureTextEntry={true} />
                    </Card>
                    <AuthButton title='Sign Up' onPress={signUpHandler} />
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

export default SignUp;