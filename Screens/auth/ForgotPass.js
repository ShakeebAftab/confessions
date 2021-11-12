import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Text, TouchableWithoutFeedback, Keyboard, Platform } from 'react-native';

//  Firebase Setup
import * as firebase from 'firebase';
import firebaseConfig from '../../config';
if (!firebase.apps.length) { firebase.initializeApp(firebaseConfig); }

//  Custom Components
import Card from '../../Components/Card';
import AuthButton from '../../Components/AuthButton';

const ForgotPass = ({ navigation }) => {
    // States
    const [emailText, setEmailText] = useState('')
    const [notifier, setNotifier] = useState(false)
    const [error, setError] = useState(false)
    const [errorMsg, setErrorMsg] = useState('')

    //  Text Handlers
    const emailTextHandler = (enteredText) => setEmailText(enteredText)

    //  Auth Button Handler
    const recoverHandler = async () => {
        try {
            await firebase.auth().sendPasswordResetEmail(emailText)
            setNotifier(true)
        } catch (err) {
            setError(true)
            setErrorMsg(err.message)
        }
        Keyboard.dismiss()
        setEmailText('')
    }

    const notifierComponent = (
        <Card styles={style.card}>
            <Text>Emaill has been sent</Text>
        </Card>
    )

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={style.parent}>
                {notifier && notifierComponent}
                <Card styles={style.card}>
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
                    <AuthButton title='Recover' onPress={recoverHandler} />
                </Card>
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
        color: '#d92027',
        paddingVertical: '1%'
    }
})

export default ForgotPass;