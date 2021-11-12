import React from 'react';
import { View, StyleSheet } from 'react-native';

const Card = ({ children, styles }) => {
    return (
        <View style={{ ...style.card, ...styles }}>{children}</View>
    )
}

const style = StyleSheet.create({
    card: {
        padding: '3%',
        marginVertical: '2%',
        width: '100%',
        shadowColor: 'red',
        shadowRadius: 10,
        elevation: 8,
        backgroundColor: 'white'
    }
})

export default Card;