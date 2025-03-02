'use client'
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useAuth } from '../_hooks/useAuth';
import { AuthorInfo, fetchStatus } from '../types';
import { Loader } from 'lucide-react';
import { codeForToken, tokenToUser } from '../_utils/auth';

function AuthEffect() {
    const query = useSearchParams()
    const router = useRouter();
    const {login} = useAuth();
    const [status, setStatus] = useState<fetchStatus>('loading');
    const [errorMessage, setErrorMessage] = useState('')
    const [profile, setProfile] = useState<AuthorInfo | null>(null)

    useEffect(()=>{
        if (errorMessage) setStatus('error')
    }, [errorMessage])

    useEffect(()=>{
        if (profile) {
            login(profile);
            router.push('/')
        }
    }, [profile, router, login])
    

    useEffect(()=>{
        const initialize = async (c: string | null)=>{
            if (!c) {
                return setErrorMessage('Missing Authentication Code')
            }
            try {
                const token = await codeForToken(c);
                if (!token || !token.id_token) {
                    setErrorMessage('Invalid authentication token');
                }
                const profileResponse = await tokenToUser(token.id_token);
                if (!profileResponse) {
                    setErrorMessage('User does not exist');
                }
                setProfile(profileResponse as AuthorInfo)            
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