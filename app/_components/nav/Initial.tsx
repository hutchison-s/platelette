'use client'

import { useAuth } from '@/app/_hooks/useAuth'
import { LogIn } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import UserPhoto from '../ui/UserPhoto'

function Initial() {
    const {user} = useAuth()
  return (
    user 
      ? <Link href={`/account`} className='size-8 text-sm aspect-square rounded-full border-1 border-background2 text-background2 font-light font-body grid place-items-center'><UserPhoto url={user.photo} name={user.name}/></Link>
      : <div className='size-8 text-sm aspect-square rounded-full border-1 border-background2 text-background2 font-light font-body grid place-items-center'>
        <Link href='https://auth.platelette.com/login?client_id=27a4hidci87i37h6ufhdg5mo4&response_type=code&scope=aws.cognito.signin.user.admin+email+openid+profile&redirect_uri=https%3A%2F%2Fwww.platelette.com%2Fauth-callback'>
          <LogIn size={16} className='text-background2'/>
        </Link>
      </div> 
  )
}

export default Initial