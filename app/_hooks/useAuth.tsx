'use client'
import { createContext, useContext, useEffect, useState } from "react";
import { AuthorInfo } from "../types";
import { getExpiry, refreshAuthTokens, tokenToUser } from "../_utils/auth";

type AuthInfo = {user_info: AuthorInfo, access_token: string}
type AuthType = {
    login: (ai: AuthInfo)=>void,
    logout: ()=>void,
    update: (u: Partial<AuthorInfo>) => void,
    refresh: ()=>Promise<string | null>,
    user?: AuthorInfo,
    access?: string
}

const inital: AuthType = {
    login: (ai: AuthInfo)=>console.log(ai.user_info.name),
    logout: ()=>null,
    update: (u: Partial<AuthorInfo>) => console.log(u),
    refresh: () => new Promise((resolve)=>resolve(null)),
    user: undefined,
    access: undefined
}

const AuthContext = createContext<AuthType>(inital);

export function AuthProvider({children}: {children: React.ReactNode}) {
    const [user, setUser] = useState<AuthorInfo | undefined>(undefined);
    const [access, setAccess] = useState<string | undefined>(undefined);
    const login = ({user_info, access_token}: AuthInfo) => {
        setUser(user_info);
        setAccess(access_token);
    }
    const logout = ()=>{
        setUser(undefined)
        setAccess(undefined)
    }
    const update = (u: Partial<AuthorInfo>) => {
        if (!user) return;
        setUser(prev => {
            return {
                ...prev,
                ...u
            }
        })
    }
    const refresh = async () => {
        const tokens = await refreshAuthTokens();
        if (!tokens || !tokens.id_token || !tokens.access_token) {
            logout();
            return null;
        } else {
            const user_info = await tokenToUser(tokens.id_token, tokens.access_token);
            if (!user_info) {
                logout();
                return null;
            }
            login({user_info, access_token: tokens.access_token})
            return tokens.access_token
        }
    }

    useEffect(() => {
        const scheduleRefresh = async () => {
            const tokens = await refreshAuthTokens();
            if (!tokens || !tokens.id_token || !tokens.access_token) {
                return;
            }
            const user_info = await tokenToUser(tokens.id_token, tokens.access_token);
            if (!user_info) {
                return;
            }
            login({ user_info, access_token: tokens.access_token });
    
            const expires = await getExpiry(tokens.access_token)
            if (expires) {
                const delay = (expires * 1000 - Date.now()) - 60000; 
                setTimeout(scheduleRefresh, Math.max(delay, 5000));
            }
        };
    
        scheduleRefresh();
    }, []);

    return (
        <AuthContext.Provider value={{update, refresh, login, logout, user, access}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = ()=>useContext(AuthContext);