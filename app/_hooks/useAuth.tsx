'use client'
import { createContext, useContext, useState } from "react";

type AuthType = {
    login: (name: string)=>void,
    logout: ()=>void,
    user: string
}

const inital: AuthType = {
    login: (name: string)=>console.log(name),
    logout: ()=>null,
    user: ''
}

const AuthContext = createContext<AuthType>(inital);

export function AuthProvider({children}: {children: React.ReactNode}) {
    const [user, setUser] = useState('');
    const login = (name: string) => {
        setUser(name);
    }
    const logout = ()=>{
        setUser('')
    }

    return (
        <AuthContext.Provider value={{login, logout, user}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = ()=>useContext(AuthContext);