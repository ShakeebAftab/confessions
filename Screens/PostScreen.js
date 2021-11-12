import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, KeyboardAvoidingView } from 'react-native';
import axios from 'axios'

//  Custom Components
import PostScreenPost from '../Components/PostScreenPost'
import Comment from '../Components/Comment'
import WriteComment from '../Components/WriteComment'

const PostScreen = ({ navigation, route }) => {
    const [comments, setComments] = useState([])
    const [refresh, setRefresh] = useState(false)
    const [effectHook, setEffectHook] = useState(false)

    const userLikes = route.params.userLikes

    const post = {
        userName: route.params.userName,
        body: route.params.body,
        id: route.params.id,
        likes: route.params.likes,
        hidden: route.params.hidden,
    }


    const changeHandler = () => setEffectHook(!effectHook)

    const getComments = async () => {
        setRefresh(true)
        const res = await axios.get(`https://us-central1-projectconfession-50eb6.cloudfunctions.net/api/comments/${post.id}`)
        const data = res.data
        let comments = [];
        for (let i = 0; i < Object.keys(data).length; i++) {
            comments.push(data[i])
        }
        setComments(comments)
        setRefresh(false)
    }

    useEffect(() => {
        getComments()
    }, [])

    const setFlag = (id) => {
        let flag = false;
        for (let i = 0; i < userLikes.length; i++) {
            if (id == userLikes[i]) {
                flag = true
            }
        }
        return flag
    }

    return (
        <View style={style.view} >
            <PostScreenPost post={post} userLikes={userLikes} flag={() => setFlag(post.id)} />
            <FlatList data={comments} renderItem={({ item }) => <Comment comment={item} />} onRefresh={getComments} refreshing={refresh} extraData={effectHook} />
            <View>
            {/* <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset='50'> */}
                <WriteComment postID={post.id} postUserName={post.hidden ? 'ANONYMOUS' : post.userName} comments={comments} refresh={changeHandler} />
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

export default PostScreen;