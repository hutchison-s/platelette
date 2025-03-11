'use client'

import UserCard from '@/app/_components/cards/UserCard';
import { useApiController } from '@/app/_hooks/useApiController';
import UserRecipes from '@/app/account/_components/UserRecipes';
import NotFound from '@/app/not-found';
import { AuthorInfo, fetchStatus } from '@/app/types';
import { Loader } from 'lucide-react';
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

function MemberPublicPage() {
    const searchParams = useSearchParams();
    const [profile, setProfile] = useState<AuthorInfo | null>(null)
    const [status, setStatus] = useState<fetchStatus>('loading');
    const {Users} = useApiController();


    useEffect(()=>{
        setStatus('loading');
        const getProfile = async(id: string)=>{
            const user = await Users.getOne(id);
            if (user) {
                setProfile({...user, email: undefined})
                setStatus('success')
            } else {
                setStatus('error')
            }
        }
        const id = searchParams.get('member');
        if (!id) {
            setStatus('error');
            return;
        };
        getProfile(id);
    }, [searchParams, Users])

    if (status == 'error') {
        return <NotFound />
    }
    if (status == 'loading') {
        return <Loader size={80} className='text-primary mx-auto my-6 animate-spin'/>
    }
  return (
    profile && <>
        <UserCard profile={profile}/>
        <section className='mx-auto max-w-600 mb-8'>
            <UserRecipes profile={profile} />
        </section>
    </>
  )
}

export default MemberPublicPage