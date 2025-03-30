'use client'

import React from 'react'
import { LinkButton } from './Buttons'
import { useAuth } from '@/app/_hooks/useAuth'
import { loginLink } from '@/app/_utils/constants'
import { PlusCircle } from 'lucide-react'

function ActionButtons() {
    const {user} = useAuth()
  return (
    <>
        <LinkButton href='/browse' variant="hollow" className="min-w-32 md:min-w-40 text-center">Browse</LinkButton>
        {user
            ? <LinkButton href='/create' className="min-w-32 md:min-w-40 text-center flex gap-2 items-center">Create with AI <PlusCircle strokeWidth={1} /></LinkButton>
            : <LinkButton href={loginLink} className="min-w-32 md:min-w-40 text-center">Log In</LinkButton>
        }
    </>
  )
}

export default ActionButtons