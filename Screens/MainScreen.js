import React, { useEffect, useState, useContext } from 'react';
import { View, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { Notifications } from 'expo'
import * as Permissions from 'expo-permissions'
import Constants from 'expo-constants';
import axios from 'axios'

//  Custom Components
import Post from '../Components/Post'

//  Context
import { Context } from '../Context'
import AsyncStorage from '@react-native-community/async-storage';

const MainScreen = ({ navigation, route }) => {
    const [posts, setPosts] = useState([])
    const [refresh, setRefresh] = useState(false)
    const [userLikes, setUserLikes] = useState([])
    const [likeFlag, setLikeFlag] = useState(false)
    const [expoPushToken, setExpoPushToken] = useState('')

    const { postState } = useContext(Context)

    //  Register for notifications
    const registerForNotifications = async () => {
        if (Constants.isDevice) {
            const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
            let finalStatus = existingStatus;
            if (existingStatus !== 'granted') {
              const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
              finalStatus = status;
            }
            if (finalStatus !== 'granted') {
              alert('Failed to get push token for push notification!');
              return;
            }
            token = await Notifications.getExpoPushTokenAsync();
            const email = await AsyncStorage.getItem('@email')
            console.log(token)
            await axios({
                method: 'POST',
                url: `https://us-central1-projectconfession-50eb6.cloudfunctions.net/api/addtoken`,
                data: {
                    email: email,
                    token: token
                }
            })
          }
      
          if (Platform.OS === 'android') {
            Notifications.createChannelAndroidAsync('default', {
              name: 'default',
              sound: true,
              priority: 'max',
              vibrate: [0, 250, 250, 250],
            });
          }

    }

    const getPosts = async () => {
        setRefresh(true)
        const res = await axios.get(`https://us-central1-projectconfession-50eb6.cloudfunctions.net/api/posts`)
        const data = res.data
        let posts = [];
        for (let i = 0; i < Object.keys(data).length; i++) {
            posts.push(data[i])
        }
        setPosts(posts)
        setRefresh(false)
    }

    const getUserlikes = async () => {
        const email = await AsyncStorage.getItem('@email')
        const res = await axios.get(`https://us-central1-projectconfession-50eb6.cloudfunctions.net/api/checklike/${email}`)
        const data = res.data
        for (let i = 0; i < Object.keys(data).length; i++) {
            userLikes.push(data[i])
        }
        setUserLikes(userLikes)
        setLikeFlag(true)
    }

    useEffect(() => {
        registerForNotifications()
    }, [])

    useEffect(() => {
        getUserlikes()
    }, [refresh])

    useEffect(() => {
        getPosts()
    }, [postState])

    const setFlag = (id) => {
        let flag = false;
        for (let i = 0; i < userLikes.length; i++) {
            if (id == userLikes[i]) {
                flag = true
            }
        }
        return flag
    }

    if (!likeFlag) {
        return (
            <ActivityIndicator />
        )
    }

    return (
        <FlatList data={posts} renderItem={({ item }) => <Post post={item} userLikes={userLikes} flag={() => setFlag(item.id)} setLikes={setUserLikes} />} onRefresh={getPosts} refreshing={refresh} />
    )
}

export default MainScreen;
