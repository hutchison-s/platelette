'use client'

import React from 'react'
import { LinkButton } from './Buttons'
import { useAuth } from '@/app/_hooks/useAuth'
import { loginLink } from '@/app/_utils/constants'

function ActionButtons() {
    const {user} = useAuth()
  return (
    <>
        <LinkButton href='#' variant="hollow" className="min-w-32 md:min-w-40 text-center">Browse</LinkButton>
        {user
            ? <LinkButton href='/account' className="min-w-32 md:min-w-40 text-center">Profile</LinkButton>
            : <LinkButton href={loginLink} className="min-w-32 md:min-w-40 text-center">Log In</LinkButton>
        }
    </>
  )
}

export default ActionButtons