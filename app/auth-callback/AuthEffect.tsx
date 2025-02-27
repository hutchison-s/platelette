'use client'
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react'

function AuthEffect() {
    const query = useSearchParams()
    const router = useRouter();
    

    useEffect(()=>{
        const getToken = async ()=>{
            const token = await fetch(`https://api.platelette.com/auth?code=${code}`).then(res => res.json()).catch(err => console.error(err));
            localStorage.setItem('jwt', JSON.stringify(token));
            router.push('/')
        }
        const code = query.get('code');
        getToken()
    }, [query, router])
    
  return (
    <></>
  )
}

export default AuthEffect