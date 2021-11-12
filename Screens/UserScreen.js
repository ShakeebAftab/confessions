import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, ActivityIndicator } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import axios from "axios";

//  Firebase Setup
import * as firebase from 'firebase';
import firebaseConfig from '../config';
if (!firebase.apps.length) { firebase.initializeApp(firebaseConfig); }

//  Custom Components
import Profile from '../Components/Profile';
import Notification from '../Components/Notification';
import PostButton from '../Components/PostButton';

const UserScreen = ({ navigation }) => {
    //  State
    const [dataLoaded, setDataLoaded] = useState(false)
    const [notifications, setNotifications] = useState([])
    const [refresh, setRefresh] = useState(false)
    const [modalFlag, setModalFlag] = useState(false)

    const signOutHandler = async () => {
        firebase.auth().signOut()
        navigation.navigate('Feed')
        try {
            await AsyncStorage.removeItem('@email')
            await AsyncStorage.removeItem('@userName')
        } catch (err) {

        }
    }

    const getNotifications = async () => {
        setRefresh(true)
        const email = await AsyncStorage.getItem('@email')
        const res = await axios.get(`https://us-central1-projectconfession-50eb6.cloudfunctions.net/api/notifications/${email}`)
        const data = res.data
        let notifications = [];
        for (let i = 0; i < Object.keys(data).length; i++) {
            notifications.push(data[i])
        }
        setDataLoaded(true)
        setNotifications(notifications)
        setRefresh(false)
    }

    useEffect(() => {
        getNotifications()
    }, [])

    if (!dataLoaded) {
        return (
            <ActivityIndicator />
        )
    }

    return (
        <View style={style.parent}>
            <Profile />
            <FlatList data={notifications} renderItem={({ item }) => <Notification notification={item} />} onRefresh={getNotifications} refreshing={refresh} />
            <View style={style.viewButtons}>
                <View style={style.buttonLogOut}>
                    {/* <PostButton title='Change Password' /> */}
                    <PostButton title='Sign Out' onPress={signOutHandler} />
                    <PostButton title='About App' onPress={() => navigation.navigate('Developer')} />
                </View>
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    parent: {
        flex: 1,
        backgroundColor: 'white'
    },
    buttonLogOut: {
        width: '70%',
        margin: '2%'
    },
    viewButtons: {
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default UserScreen;