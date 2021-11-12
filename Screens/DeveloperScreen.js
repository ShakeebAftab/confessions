import React from 'react'
import { StyleSheet, View, Text, ScrollView, Image } from 'react-native'

//  Custom Components
import Card from '../Components/Card'
import DeveloperCard from '../Components/DeveloperCard'

const DeveloperScreen = () => {
    return (
        <ScrollView style={style.container}>
            <View style={style.parent}>
                <Card styles={{ padding: '10%' }}>
                    <Text style={style.welcomeText}>Welcome to Confessions!</Text>
                    <Text style={style.text}>A place where you can confess freely and anonymously if you choose to.</Text>
                </Card>
                <DeveloperCard name='Shakeeb Sheikh' role='Lead Developer' source={require('../assets/Images/shakeebSheikh.jpeg')} />
                <DeveloperCard name='Mohib Humayun' role='Lead Tester' source={require('../assets/Images/mohibHumayun.jpeg')} />
                <DeveloperCard name='Hamza Kamran' role='Lead Tester' source={require('../assets/Images/hamzaKamran.jpeg')} />
                <DeveloperCard name='Daud Mohsin' role='Lead Distributor' source={require('../assets/Images/daudMohsin.jpg')} />
                {/* <DeveloperCard name='Haseeb Bhalli' role='Resource Provider' source={require('../assets/Images/haseebBhalli.jpeg')} /> */}
            </View>
        </ScrollView>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    parent: {
        margin: '3%'
    },
    welcomeText: {
        fontSize: 15,
        fontFamily: 'userNameFont',
        textAlign: 'center',
        marginVertical: '2%'
    },
    text: {
        letterSpacing: 1.3,
        fontSize: 13,
        paddingVertical: '3%'
    }
})

export default DeveloperScreen;