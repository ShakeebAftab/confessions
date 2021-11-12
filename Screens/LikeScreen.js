import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, FlatList, ActivityIndicator } from 'react-native'
import axios from 'axios'

//  Custom Components
import Card from '../Components/Card'

const Likes = ({ route }) => {
    //  State
    const [userNames, setUserNames] = useState([])
    const [dataLoaded, setDataLoaded] = useState(false)

    const postID = route.params.id

    //  Get UserNames
    const getUserNames = async () => {
        const res = await axios.get(`https://us-central1-projectconfession-50eb6.cloudfunctions.net/api/likeusernames/${postID}`)
        const data = res.data
        let userNames = [];
        for (let i = 0; i < Object.keys(data).length; i++) {
            userNames.push(data[i])
        }
        setUserNames(userNames)
        setDataLoaded(true)
    }

    useEffect(() => {
        getUserNames()
    }, [])

    if (!dataLoaded) {
        return (
            <ActivityIndicator />
        )
    }

    return (
        <View>
            <FlatList data={userNames} renderItem={({ item }) => {
                return (
                    <Card styles={style.card}>
                        <Text style={style.text}>{item.userName}</Text>
                    </Card>
                )
            }} />
        </View>
    )
}

const style = StyleSheet.create({
    card: {
        alignItems: 'center'
    },
    text: {
        fontSize: 15,
        fontFamily: 'userNameFont',
        color: '#d92027'
    }
})

export default Likes;