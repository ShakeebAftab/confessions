import React, { useContext, createContext, useState, useEffect } from 'react'

export const Context = createContext()

export const PostStateProvider = ({ children }) => {
    const [postState, setPostState] = useState(false)
    return (
        <Context.Provider value={{ postState, setPostState }}>
            {children}
        </Context.Provider>
    )
}

// export const LikeStateProvider = ({ children }) => {
//     const [emailText, setEmailText] = useState('')
//     const [userLikes, setUserLikes] = useState([])
//     const [likeState, setLikeState] = useState(false)

//     const getData = async () => {
//         const email = AsyncStorage.getItem('@email')
//         setEmailText(email)
//     }



//     return (
//         <LikeStateContext.Provider value={}>
//             {children}
//         </LikeStateContext.Provider>
//     )
// }

