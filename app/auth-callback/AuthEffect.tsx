'use client'
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react'
import jwt, { JwtPayload } from 'jsonwebtoken';
import { useAuth } from '../_hooks/useAuth';

function AuthEffect() {
    const query = useSearchParams()
    const router = useRouter();
    const {login} = useAuth();
    

    useEffect(()=>{
        const getToken = async ()=>{
            const res = await fetch(`https://api.platelette.com/auth?code=${code}`, {method: 'GET', headers: {'Accept': "application/json"}});
            console.log(res)
            if (!res.ok) {
                console.log('response status', res.status)
            }
            const token = await res.json();
            localStorage.setItem('jwt', token.id_token);
            // const userInfo = await fetch('https://api.platelette.com/auth/verify', {credentials: 'include'}).then(res => res.json()).catch(err => console.log('error fetching user info:', err));
            const userInfo = jwt.decode(token.id_token) as JwtPayload
            if (userInfo && userInfo.given_name) {
                login(userInfo.given_name)
            }
            
            router.push('/')
        }
        const code = query.get('code');
        console.log(code)
        getToken()
    }, [query, router, login])
    
  return (
    <></>
  )
}

export default AuthEffect