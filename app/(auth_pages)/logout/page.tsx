'use client'
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation';
import { Loader } from 'lucide-react';
import { useAuth } from '@/app/_hooks/useAuth';

function LogoutPage() {
    const {logout} = useAuth();
    const router = useRouter();

    useEffect(()=>{
        fetch('https://api.platelette.com/auth/logout', {credentials: 'include'})
          .catch(err => {
            console.error(err);
          })
          .finally(()=>{
            logout();
            router.push('/')
          })
        
    }, [logout, router])
  return (
    <div className='w-full min-h-[400px] flex flex-col justify-center items-center gap-4'>
        <h2 className='font-heading text-3xl font-bold text-foreground'>Logging you out...</h2>
        <Loader size={80} className='animate-spin text-primary'/>
    </div>
  )
}

export default LogoutPage