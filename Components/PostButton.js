import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Platform } from 'react-native';

const PostButton = ({ title, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.6} >
            <View style={style.buttonView}>
                <Text style={style.buttonText}>{title}</Text>
            </View>
        </TouchableOpacity>
    )
}

const style = StyleSheet.create({
    buttonView: {
        backgroundColor: 'white',
        paddingHorizontal: 50,
        paddingVertical: '3%',
        marginVertical: '3%',
        borderRadius: 40,
        ...Platform.select({
            ios: {
                borderWidth: 1
            }
        }),
        shadowColor: '#d92027',
        shadowOffset: { width: 20, height: 20 },
        elevation: 8
    },
    buttonText: {
        fontSize: 15,
        textAlign: 'center',
        color: '#d92027'
    }
})

export default PostButton;