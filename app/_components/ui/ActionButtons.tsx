'use client'

import React from 'react'
import { LinkButton } from './Buttons'
import { useAuth } from '@/app/_hooks/useAuth'

function ActionButtons() {
    const {user} = useAuth()
  return (
    <>
        <LinkButton href='#' variant="hollow" className="min-w-32 md:min-w-40 text-center">Browse</LinkButton>
        {user
            ? <LinkButton href='/account' className="min-w-32 md:min-w-40 text-center">Profile</LinkButton>
            : <LinkButton href='https://auth.platelette.com/login?client_id=27a4hidci87i37h6ufhdg5mo4&response_type=code&scope=aws.cognito.signin.user.admin+email+openid+profile&redirect_uri=https%3A%2F%2Fwww.platelette.com%2Fauth-callback' className="min-w-32 md:min-w-40 text-center">Log In</LinkButton>
        }
    </>
  )
}

export default ActionButtons