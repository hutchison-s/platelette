'use client'

import React, { FormEventHandler, useEffect } from 'react'
import { useAuth } from '../_hooks/useAuth'
import SectionHeading from '../_components/ui/SectionHeading'
import Card from '../_components/cards/Card'
import { useRouter } from 'next/navigation'
import UserPhoto from '../_components/ui/UserPhoto'
import { ButtonStyles } from '../_components/ui/Buttons'
import Link from 'next/link'
import { logoutLink } from '../_utils/constants'
import { UserController } from '../_utils/apiController'
import { TextInput } from '../_components/ui/Inputs'

function AccountPage() {
    const {user, login} = useAuth()
    const router = useRouter()

    useEffect(()=>{
        if (!user) {
            router.push('/login')
        }
    }, [router, user])

    const handleEdit: FormEventHandler<HTMLFormElement> = (e)=>{
        const controller = new UserController();
        const fd = new FormData(e.currentTarget);
        controller.update({
            ...user,
            name: fd.get('name') as string
        }, `/${user?.sub}`).then(res => {
            if (!res) throw new Error('Missing user update response')
            console.log(res);
            login({...user, name: fd.get('name') as string});
            router.refresh();
        }).catch(err => {
            console.error(err);
        })
    }

  return (
    <>
        <SectionHeading>Account Information</SectionHeading>
        <Card className='grid gap-4 p-6 max-w-600 mx-auto'>
            <h3 className='font-heading font-bold my-4 text-xl'>Name: {user?.name}</h3>
            <p>Email: <em>{user?.email}</em></p>
            {user?.photo && <div><UserPhoto url={user.photo} name={user.name}/></div>}
            <Link className={ButtonStyles.primary+' block w-fit'} href={logoutLink} >Log Out</Link>
        </Card>
        <Card>
            <p>Edit Info:</p>
            <form onSubmit={handleEdit}>
                <TextInput rest={{defaultValue: user?.name}} label='Name' name='name' />
            </form>
        </Card>
    </>
  )
}

export default AccountPage