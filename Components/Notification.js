import React from 'react';
import { StyleSheet, View, Text, TouchableWithoutFeedback, TouchableOpacityBase, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native'

// Custom Components
import Card from './Card';

const Notification = ({ notification: { commentUserName, postID, postUserName } }) => {
    const navigation = useNavigation()
    return (
        <TouchableWithoutFeedback onPress={() => navigation.navigate('NotificationPost', { postID })}>
            <View style={style.card}>
                <Card styles={style.card}>
                    <View style={style.viewText}>
                        <Text>{commentUserName} commented on {postUserName}'s post</Text>
                    </View>
                </Card>
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

    },
    viewText: {
        ...Platform.select({
            ios: {
                borderWidth: 0.3,
                borderRadius: 20
            }
        }),
        flexDirection: 'row',
        paddingVertical: '1%',
        justifyContent: 'center',
    },
    userNameText: {
        fontFamily: 'userNameFont'
    }
})

export default Notification;