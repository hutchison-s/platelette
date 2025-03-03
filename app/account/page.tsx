'use client'

import React, { FormEventHandler, useEffect, useState } from 'react'
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
import { Pencil } from 'lucide-react'

function AccountPage() {
    const {user, login} = useAuth()
    const router = useRouter()
    const [isEditing, setIsEditing] = useState(false)

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
            setIsEditing(false);
            router.refresh();
        }).catch(err => {
            console.error(err);
        })
    }

  return (
    <>
        <SectionHeading>Account Information</SectionHeading>
        <Card className='grid gap-4 p-6 max-w-600 mx-auto'>
            <h3 className='font-heading font-bold my-4 text-xl'>Name: {user?.name} <Pencil className='text-primary p-1 border-1 border-primary rounded-sm' role='button' tabIndex={0} onClick={()=>setIsEditing(true)}/></h3>
            <p>Email: <em>{user?.email}</em></p>
            {user?.photo && <div><UserPhoto url={user.photo} name={user.name}/></div>}
            <Link className={ButtonStyles.primary+' block w-fit'} href={logoutLink} >Log Out</Link>
        </Card>
        {isEditing && <Card className='grid gap-4 p-6 max-w-600 mx-auto mt-4'>
            <p>Edit Info:</p>
            <form onSubmit={handleEdit} onReset={()=>setIsEditing(false)}>
                <TextInput rest={{defaultValue: user?.name}} label='Name' name='name' />
                <div className="flex justify-center gap-4 w-full">
                    <button type='submit' className={ButtonStyles.primary}>Save</button>
                    <button type='reset' className={ButtonStyles.hollow}>Cancel</button>
                </div>
            </form>
        </Card>}
    </>
  )
}

export default AccountPage