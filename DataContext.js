import React, { useContext, createContext, useState, useEffect } from 'react'
import AsyncStorage from '@react-native-community/async-storage'

export const DataContext = createContext()

export const DataProvider = ({ children }) => {
    const [userLikes, setUserLikes] = useState([])

    const getUserlikes = async () => {
        const email = await AsyncStorage.getItem('@email')
        const res = await axios.get(`https://us-central1-projectconfession-50eb6.cloudfunctions.net/api/checklike/${email}`)
        const data = res.data
        for (let i = 0; i < Object.keys(data).length; i++) {
            userLikes.push(data[i])
        }
        setUserLikes(userLikes)
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <DataContext.Provider value={userLikes, setUserLikes}>
            {children}
        </DataContext.Provider>
    )
}