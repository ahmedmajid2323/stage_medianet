import { createContext, useState } from 'react'

const GlobalStateContext = createContext({
    currentUser: {},
    userToken: null,
    setCurrentUser : ()=>{},
    setUserToken : ()=>{},
});

const ContextProvider = ({ children }) => {

    const [userToken , setUserToken] = useState(localStorage.getItem('TOKEN') || '')
    const [currentUser , setCurrentUser] = useState({})

    const setToken = (token) => {
        if(token){
            localStorage.setItem('TOKEN' , token)
        }else{
            localStorage.removeItem('TOKEN')
        }
        setUserToken(token)
    }

    return(

        <GlobalStateContext.Provider value={{
            userToken,
            setCurrentUser,
            setUserToken,
            currentUser,
            setToken
        }}>
            {children}
        </GlobalStateContext.Provider>

    )

}

export { ContextProvider , GlobalStateContext };