import React, { useEffect, useState, useContext } from 'react';
import { View, StyleSheet, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native';

// Custom Components
import Card from '../Components/Card'
import PostButton from '../Components/PostButton'
import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage';

//  Context
import { Context } from '../Context'

const CreatePostScreen = ({ navigation }) => {
    // States
    const [userValue, setUserValue] = useState('')
    const [emailText, setEmailText] = useState('')
    const [nameText, setNameText] = useState('')

    // Context
    const { postState, setPostState } = useContext(Context)

    //  Get data from memory
    const getData = async () => {
        const email = await AsyncStorage.getItem('@email')
        const name = await AsyncStorage.getItem('@userName')
        setEmailText(email)
        setNameText(name)
    }

    useEffect(() => {
        getData()
    }, [])

    //  onChange Text Handler
    const onChangePostText = (enteredText) => setUserValue(enteredText)

    // Button Handlers
    const realPostHandler = async () => {
        const body = userValue
        setUserValue('')
        if (body != '') {
            try {
                await axios({
                    method: 'post',
                    url: `https://us-central1-projectconfession-50eb6.cloudfunctions.net/api/post`,
                    data: {
                        email: emailText,
                        userName: nameText,
                        body: body,
                        hidden: false
                    }
                })
            } catch (err) {
                console.log(err.message)
            }
            setPostState(!postState)
        }
    }


    const hiddenPostHandler = async () => {
        const body = userValue
        setUserValue('')
        if (body != '') {
            try {
                await axios({
                    method: 'post',
                    url: `https://us-central1-projectconfession-50eb6.cloudfunctions.net/api/post`,
                    data: {
                        email: emailText,
                        userName: nameText,
                        body: body,
                        hidden: true
                    }
                })
            } catch (err) {
                console.log(err)
            }
            setPostState(!postState)
        }
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={style.parent}>
                <Card style={style.card}>
                    <View style={style.inputView}>
                        <TextInput style={style.inputText} autoFocus={true} onChangeText={onChangePostText} multiline autoFocus={true} numberOfLines={6} placeholder={'Write a confession...\n\n<--Remember if you want to post your confession anonymously click the Anonymous button down below-->'} textAlignVertical='top' value={userValue}></TextInput>
                    </View>
                </Card>
                <View style={style.viewButton}>
                    <PostButton title='REAL' onPress={realPostHandler} />
                    <PostButton title='ANONYMOUS' onPress={hiddenPostHandler} />
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

const style = StyleSheet.create({
    parent: {
        flex: 1,
        backgroundColor: 'white'
    },
    card: {
        flex: 2,
        margin: '20%'
    },
    inputView: {
        paddingVertical: '4%',
        borderColor: 'black', //'#d92027',
        borderTopWidth: 1,
        borderBottomWidth: 1
    },
    inputText: {
        width: '100%'
    },
    viewButton: {
        marginVertical: '5%',
        justifyContent: 'space-between',
        marginHorizontal: '5%'
    }
})

export default CreatePostScreen;