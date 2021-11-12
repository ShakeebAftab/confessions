import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TextInput, Keyboard, KeyboardAvoidingView } from 'react-native';
import axios from 'axios'

//Custom Components
import Card from './Card';
import MyButton from './MyButton'

//  Icons
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage';

const WriteComment = ({ postID, refresh, comments, postUserName }) => {
    //  States
    const [userValue, setUserValue] = useState('')
    const [emailText, setEmailText] = useState('')
    const [nameText, setNameText] = useState('')

    //  onChange Handler
    const onChangeCommentHandler = (enteredText) => setUserValue(enteredText)

    // Handle onPress
    const postCommentHandler = async () => {
        const newComment = {
            email: emailText,
            userName: nameText,
            postID: postID,
            body: userValue
        }
        if (userValue != '') {
            try {
                axios({
                    method: 'POST',
                    url: `https://us-central1-projectconfession-50eb6.cloudfunctions.net/api/comment`,
                    data: {
                        email: emailText,
                        userName: nameText,
                        postID: postID,
                        body: userValue,
                        postUserName: postUserName
                    }
                })
                setUserValue('')
                refresh()
                comments.push(newComment)
                Keyboard.dismiss()
            } catch (err) {
                console.log(err)
            }
        }
    }

    const getData = async () => {
        const email = await AsyncStorage.getItem('@email')
        const name = await AsyncStorage.getItem('@userName')
        setEmailText(email)
        setNameText(name)
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <Card styles={style.card}>
            <View style={style.input}>
                <TextInput placeholder='Write a comment...' value={userValue} onChangeText={onChangeCommentHandler} multiline={true} style={style.textInput} textAlignVertical='top' />
            </View>
            <MyButton styles={style.buttonSend} onPress={postCommentHandler}>
                <MaterialCommunityIcons name="send-circle" size={30} color="black" />
            </MyButton>
        </Card>
    )
}

const style = StyleSheet.create({
    card: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    input: {
        paddingLeft: '2%',
        width: '90%'
    },
    buttonSend: {
        paddingRight: '1%'
    },
    textInput: {

    }
})

export default WriteComment;