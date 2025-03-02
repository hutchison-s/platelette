'use client'
import { createContext, useContext, useEffect, useState } from "react";
import { AuthorInfo } from "../types";
import { tokenToUser } from "../_utils/auth";

type AuthType = {
    login: (u: AuthorInfo)=>void,
    logout: ()=>void,
    user?: AuthorInfo
}

const inital: AuthType = {
    login: (u: AuthorInfo)=>console.log(u.name),
    logout: ()=>null,
    user: undefined
}

const AuthContext = createContext<AuthType>(inital);

export function AuthProvider({children}: {children: React.ReactNode}) {
    const [user, setUser] = useState<AuthorInfo | undefined>(undefined);
    const login = (u: AuthorInfo) => {
        setUser(u);
    }
    const logout = ()=>{
        localStorage.removeItem('jwt')
        setUser(undefined)
    }

    useEffect(()=>{
        const localLogin = (id_token: string)=>{
            tokenToUser(id_token).then(user => {
                if (user) {
                    login(user)
                }
            })
        }
        const localToken = localStorage.getItem('jwt');
        if (localToken) {
            localLogin(localToken)
        }
    }, [])

    return (
        <AuthContext.Provider value={{login, logout, user}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = ()=>useContext(AuthContext);