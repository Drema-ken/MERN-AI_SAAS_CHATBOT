import {  createContext, ReactNode, useContext, useEffect, useState } from "react";
import { checkAuthStatus, loginUser } from "../helpers/api-communicator";


type User = {
    name: string
    email: string
}

type UserAuth = {
    isLoggedIn: boolean
    user: User | null
    login: (email:string,password:string) => Promise<void>
    signup: (name:string,email:string,password:string) => Promise<void>
    logout: () => Promise<void>
}

const AuthContext = createContext<UserAuth | null>(null)//DON'T REALLY UNDERSTAND THIS PART

const AuthProvider = ({children}:{children:ReactNode}) =>{
    const [user,setUser] = useState<User | null>( null)
    const [isLoggedIn,setIsLoggedIn] = useState(false)

    useEffect(()=>{
            //if user cookies are valid then skip login
            try {
                async function checkStatus() {
                    const data = await checkAuthStatus()
                    if(data){
                        setUser({name: data.name,email:data.email});
                        setIsLoggedIn(true)
                     }
                     
                }
    
                checkStatus()
            } catch (error) {
                console.log(error)
            }
   
    },[])

    const login: UserAuth['login'] = async (email,password) =>{
       const data = await loginUser(email,password)
       if(data){
          setUser({name: data.name,email:data.email});
          setIsLoggedIn(true)
       }
    }

    const signup: UserAuth['signup'] = async (name,email,password) =>{}
    const logout: UserAuth['logout'] = async () =>{}

    const value = {
        user,
        login,
        signup,
        logout,
        setUser,
        setIsLoggedIn,
        isLoggedIn
    }

    return <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
    
}

export const useAuth = () => useContext(AuthContext)

export default AuthProvider