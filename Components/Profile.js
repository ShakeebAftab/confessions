import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'

//  Custom Components
import Card from './Card';

const Profile = () => {
    const [emailText, setEmailText] = useState('')
    const [nameText, setNameText] = useState('')

    const getData = async () => {
        try {
            const email = await AsyncStorage.getItem('@email')
            const name = await AsyncStorage.getItem('@userName')
            setEmailText(email)
            setNameText(name)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <View style={style.parent} >
            <Card>
                <View style={style.viewUserName}>
                    <Text style={style.statictext}>Username: </Text>
                    <Text style={style.textUserName}>{nameText}</Text>
                </View>
                <View style={style.viewUserName}>
                    <Text style={style.statictext}>Email: </Text>
                    <Text style={style.textUserName}>{emailText}</Text>
                </View>
            </Card>
        </View>
    )
}

const style = StyleSheet.create({
    parent: {
        margin: '3%'
    },
    textUserName: {
        fontSize: 16,
        marginHorizontal: '3%',
        marginVertical: '3%',
        color: '#d92027'

    },
    statictext: {
        fontSize: 16,
        marginHorizontal: '3%',
        marginVertical: '3%',

    },
    viewUserName: {
        flexDirection: 'row'
    }
})

export default Profile;