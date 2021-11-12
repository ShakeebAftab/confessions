import React, { useState, useEffect, useLayoutEffect } from 'react';
import { View, StyleSheet, Text, TouchableWithoutFeedback, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage';

//  Custom Components
import Card from './Card'
import MyButton from './MyButton'

//  Icons
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

const Post = ({ post: { userName, body, likes, hidden, id }, userLikes, flag }) => {
    const navigation = useNavigation()
    const [emailText, setEmailText] = useState('')
    const [nameText, setNameText] = useState('')
    const [likeCounter, setLikeCounter] = useState(likes)
    const [likeColor, setLikeColor] = useState(flag() == true ? '#d92027' : 'black')

    const getData = async () => {
        const email = await AsyncStorage.getItem('@email')
        const name = await AsyncStorage.getItem('@userName')
        setEmailText(email)
        setNameText(name)
    }

    const likeHandler = () => {
        if (likeColor == 'black') {
            like()
        } else {
            dislike()
        }
    }

    //  Like Handler
    const like = async () => {
        userLikes.push(id)
        setLikeCounter(likeCounter => likeCounter + 1)
        setLikeColor('#d92027')
        try {
            const res = await axios({
                method: 'POST',
                url: `https://us-central1-projectconfession-50eb6.cloudfunctions.net/api/likes`,
                data: {
                    postID: id,
                    email: emailText,
                    userName: nameText
                }
            })
            // const newLikes = res.data
        } catch (err) {
            console.log(err)
        }
    }


    //  Dislike Handler
    const dislike = async () => {
        let newLikes = [];
        userLikes.forEach(i => i != id && newLikes.push(i));
        userLikes = newLikes
        setLikeColor('black')
        setLikeCounter(likeCounter => likeCounter - 1)
        try {
            const res = await axios({
                method: 'POST',
                url: `https://us-central1-projectconfession-50eb6.cloudfunctions.net/api/dislike`,
                data: {
                    postID: id,
                    email: emailText
                }
            })
            // const newLikes = res.data
        } catch (err) {
            console.log(err)
        }
    }

    useLayoutEffect(() => {
        setLikeCounter(likes)
    }, [])

    useEffect(() => {
        getData()
    }, [])

    return (
        < Card >
            <TouchableWithoutFeedback onPress={() => navigation.navigate('Post', { userName, body, likes, hidden, id, userLikes, likeCounter })} onLongPress={likeHandler} >
                <View style={style.parent}>
                    <View style={style.viewUserName}>
                        <Text style={style.textUserName}>{hidden ? 'ANONYMOUS' : userName}</Text>
                    </View>
                    <View style={style.viewBody}>
                        <Text style={style.textBody}>{body}</Text>
                    </View>
                </View>
            </TouchableWithoutFeedback>
            <View style={style.parent}>
                <View style={style.viewButton}>
                    <View style={style.viewLikeButton}>
                        <MyButton styles={style.buttonLike} onPress={likeHandler} >
                            <FontAwesome5 name="heartbeat" size={30} color={likeColor} />
                        </MyButton>
                        {likeCounter != '' && <Text style={{ ...style.textLike, color: likeColor }} onPress={() => navigation.navigate('Likes', { id })} >{likeCounter}</Text>}
                    </View>
                    <MyButton styles={style.buttonComment} onPress={() => navigation.navigate('Post', { userName, body, likes, hidden, id, userLikes, likeCounter })}>
                        <FontAwesome name="comments-o" size={30} color="black" />
                    </MyButton>
                </View>
            </View>
        </Card >
    )
}

const style = StyleSheet.create({
    viewUserName: {
        paddingTop: '3%'
    },
    textUserName: {
        fontSize: 16,
        fontFamily: 'userNameFont',
    },
    textBody: {
        fontSize: 14
    },
    viewBody: {
        paddingVertical: '3%',
        paddingBottom: '8%'
    },
    textLike: {
        marginTop: '4%',
        marginLeft: '10%',
        width: '40%',
        fontSize: 15
    },
    viewButton: {
        flexDirection: 'row',
        justifyContent: "space-between",
        paddingTop: '2%',
        paddingHorizontal: '5%',
        borderTopWidth: 1
    },
    parent: {
        paddingHorizontal: 15
    },
    viewLikeButton: {
        flexDirection: 'row',
        width: '30%',
    }
})

export default Post;