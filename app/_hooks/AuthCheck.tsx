'use client'

import React from 'react'
import { useAuth } from './useAuth'
import Card from '../_components/cards/Card'
import { FeaturedText } from '../_components/ui/Text'
import { ButtonStyles } from '../_components/ui/Buttons'
import Link from 'next/link'
import { loginLink } from '../_utils/constants'

function AuthCheck({children}: {children: React.ReactNode}) {
    const {user} = useAuth()

  return (
    user 
        ? children 
        : <Card className='max-w-600 p-12 h-[300px] grid place-items-center mx-auto my-[10vw] text-center'>
                <FeaturedText>You must log in to access this page</FeaturedText>
                <Link className={ButtonStyles.primary} href={loginLink}>Log In</Link>
              </Card>

  )
}

export default AuthCheck