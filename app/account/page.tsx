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
import { Loader, Pencil } from 'lucide-react'
import AuthCheck from '../_hooks/AuthCheck'
import { AuthorInfo } from '../types'

type formStatus = 'waiting' | 'submitting' | 'success' | 'error'

function AccountPage() {
    const {user, update} = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleEdit: FormEventHandler<HTMLFormElement> = (e)=>{
        setIsSubmitting(true);
        e.preventDefault();
        const controller = new UserController();
        const fd = new FormData(e.currentTarget);
        controller.update({
            ...user,
            name: fd.get('name') as string
        }, `/${user?.sub}`).then(res => {
            if (!res) throw new Error('Missing user update response')
            console.log(res);
            update({name: fd.get('name') as string});
            setIsEditing(false);
        }).catch(err => {
            console.error(err);
            setErrorMessage("Something went wrong...")
        })
        .finally(()=>{
            setIsSubmitting(false)
        })
    }

    function UserDetails({u}: {u?: AuthorInfo}) {
        if (!u) return;
        return (
            <>
                <h3 className='font-heading font-bold my-4 text-xl'>Name: {u.name}</h3>
                <p>Email: <em>{u.email}</em></p>
                {u.photo && <div><UserPhoto url={u.photo} name={u.name}/></div>}
                <Link className={ButtonStyles.primary+' block w-fit'} href={logoutLink} >Log Out</Link>
            </>
        )
    }

    function UserDetailsEdit({u}: {u?: AuthorInfo}) {
        if (!u) return;
        return (
            isSubmitting 
            ? <Loader className='text-primary mx-auto my-6 animate-spin' size={80} />
            : <form onSubmit={handleEdit} onReset={()=>setIsEditing(false)}>
                <TextInput rest={{defaultValue: user?.name}} label='Name' name='name' />
                <div className="flex justify-center gap-4 w-full">
                    <button type='submit' className={ButtonStyles.primary}>Save</button>
                    <button type='reset' className={ButtonStyles.hollow}>Cancel</button>
                </div>
            </form>
            
        )
    }

  return (
    <>
        <AuthCheck>
        <SectionHeading>Account Information</SectionHeading>
        <Card className='grid gap-4 p-6 max-w-600 mx-auto'>
            <button onClick={()=>setIsEditing(true)} className='absolute top-2 right-2 size-fit'>
                <Pencil className={`${isEditing ? 'text-background2 bg-primary scale-110' : 'text-primary bg-transparent scale-100'} transition-all p-1 border-1 border-primary rounded-full`} size={16}/>
            </button>
            {isEditing
                ? <UserDetailsEdit u={user} />
                : <UserDetails u={user} />
            }
        </Card>
        </AuthCheck>
    </>
  )
}

export default AccountPage