'use client'

import React, { useEffect } from 'react'
import { useAuth } from '../_hooks/useAuth'
import SectionHeading from '../_components/ui/SectionHeading'
import Card from '../_components/cards/Card'
import { useRouter } from 'next/navigation'
import UserPhoto from '../_components/ui/UserPhoto'
import { ButtonStyles } from '../_components/ui/Buttons'
import Link from 'next/link'
import { logoutLink } from '../_utils/constants'

function AccountPage() {
    const {user} = useAuth()
    const router = useRouter()

    useEffect(()=>{
        if (!user) {
            router.push('/login')
        }
    }, [router, user])

  return (
    <>
        <SectionHeading>Account Information</SectionHeading>
        <Card className='grid gap-4 p-6 max-w-600 mx-auto'>
            <h3 className='font-heading font-bold my-4 text-xl'>Name: {user?.name}</h3>
            <p>Email: <em>{user?.email}</em></p>
            {user?.photo && <div><UserPhoto url={user.photo} name={user.name}/></div>}
            <Link className={ButtonStyles.primary+' block w-fit'} href={logoutLink} >Log Out</Link>
        </Card>
    </>
  )
}

export default AccountPage