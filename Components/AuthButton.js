import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Platform } from 'react-native';

const AuthButton = ({ title, onPress }) => {
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
        borderWidth: 0.3,
        paddingHorizontal: 50,
        paddingVertical: '3%',
        marginVertical: '3%',
        borderRadius: 40,
        shadowColor: '#d92027',
        elevation: 2
    },
    buttonText: {
        fontSize: 15,
        textAlign: 'center',
        ...Platform.select({
            ios: {
                color: '#d92027'
            },
            android: {
                color: 'black'
            }
        })
    }
})

export default AuthButton;