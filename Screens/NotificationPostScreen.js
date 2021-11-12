import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, ActivityIndicator, KeyboardAvoidingView } from 'react-native';
import axios from 'axios'

//  Custom Components
import PostScreenPost from '../Components/PostScreenPost'
import Comment from '../Components/Comment'
import WriteComment from '../Components/WriteComment'

const NotificationPostScreen = ({ navigation, route }) => {
    const [comments, setComments] = useState([])
    const [refresh, setRefresh] = useState(false)
    const [effectHook, setEffectHook] = useState(false)
    const [post, setPost] = useState({})
    const [dataLoaded, setDataLoaded] = useState(false)

    const postID = route.params.postID

    const changeHandler = () => setEffectHook(!effectHook)

    const getPost = async () => {
        const res = await axios.get(`https://us-central1-projectconfession-50eb6.cloudfunctions.net/api/posts/${postID}`)
        const data = res.data
        setPost(data)
        setDataLoaded(true)
    }

    const getComments = async () => {
        setRefresh(true)
        const res = await axios.get(`https://us-central1-projectconfession-50eb6.cloudfunctions.net/api/comments/${postID}`)
        const data = res.data
        let comments = [];
        for (let i = 0; i < Object.keys(data).length; i++) {
            comments.push(data[i])
        }
        setComments(comments)
        setRefresh(false)
    }

    useEffect(() => {
        getPost()
        getComments()
    }, [])

    if (!dataLoaded) {
        return (
            <ActivityIndicator />
        )
    }


    return (
        <View style={style.view} >
            <PostScreenPost post={post} />
            <FlatList data={comments} renderItem={({ item }) => <Comment comment={item} />} onRefresh={getComments} refreshing={refresh} extraData={effectHook} />
            <View>
            {/* <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset='50'> */}
                <WriteComment postID={post.id} postUserName={post.userName} comments={comments} refresh={changeHandler} />
            {/* </KeyboardAvoidingView> */}
            </View>
        </View >
    )
}

const style = StyleSheet.create({
    view: {
        flex: 1
    }
})

export default NotificationPostScreen;