import React from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'

// Custom Components
import Card from './Card'

const DeveloperCard = ({ name, role, source }) => {
    return (
        <View>
            <Card styles={style.imageCard}>
                <Image source={source} style={style.image} resizeMode='cover' />
                <Text style={style.userName}>{name}</Text>
                <Text style={style.subText}>{role}</Text>
            </Card>
        </View>
    )
}

const style = StyleSheet.create({
    image: {
        width: '80%',
        height: 300,
        borderBottomRightRadius: 170,
        marginTop: '4%'
    },
    imageCard: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    userName: {
        fontSize: 23,
        fontFamily: 'userNameFont',
        marginTop: '5%'
    },
    subText: {
        marginTop: '1.5%',
        color: 'grey'
    }
})

export default DeveloperCard;