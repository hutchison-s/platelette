'use client'
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { Loader } from 'lucide-react';
import { useAuth } from '@/app/_hooks/useAuth';
import { codeForToken, tokenToUser } from '@/app/_utils/auth';
import { fetchStatus, AuthorInfo } from '@/app/types';

function AuthEffect() {
    const query = useSearchParams()
    const router = useRouter();
    const {login} = useAuth();
    const [status, setStatus] = useState<fetchStatus>('loading');
    const [errorMessage, setErrorMessage] = useState('')
    const [profile, setProfile] = useState<AuthorInfo | null>(null);
    const [access, setAccess] = useState<string | null>(null)

    useEffect(()=>{
        if (errorMessage) setStatus('error')
    }, [errorMessage])

    useEffect(()=>{
        if (profile && access) {
            login({user_info: profile, access_token: access});
            router.push('/')
        }
    }, [profile, access, router, login])
    

    useEffect(()=>{
        const initialize = async (c: string | null)=>{
            if (!c) {
                return setErrorMessage('Missing Authentication Code')
            }
            try {
                const token = await codeForToken(c);
                if (!token || !token.id_token) {
                    setErrorMessage('Invalid authentication token');
                    return;
                }
                const profileResponse = await tokenToUser(token.id_token, token.access_token);
                if (!profileResponse) {
                    setErrorMessage('User does not exist');
                }
                await fetch('https://api.platelette.com/analytics/auth-callback', {
                    method: 'POST',
                    mode: 'cors',
                    headers: {
                        "Authorization": `Bearer ${token.access_token}`,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({})
                }).catch(err => {
                    console.error(err);
                })
                setProfile(profileResponse as AuthorInfo)
                setAccess(token.access_token)            
                setStatus('success');
            } catch (error) {
                console.error(error);
                return setErrorMessage(String(error))
            }
        }

        const code = query.get('code');
        initialize(code)
    }, [query])

    function StatusDisplay() {
        switch(status) {
            case 'loading':
                return <Loader size={120} className='text-primary animate-spin mx-auto my-4'/>;
            case 'error':
                return <p>Error occured: {errorMessage}</p>
            default:
                return null;
        }
    }
    
  return (
    <>
        <StatusDisplay />
    </>
  )
}

export default AuthEffect