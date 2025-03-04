'use client'

import React, { FormEventHandler, useEffect, useState } from 'react'
import { useAuth } from '../_hooks/useAuth'
import SectionHeading from '../_components/ui/SectionHeading'
import Card from '../_components/cards/Card'
import UserPhoto from '../_components/ui/UserPhoto'
import { ButtonStyles } from '../_components/ui/Buttons'
import Link from 'next/link'
import { logoutLink } from '../_utils/constants'
import { UserController } from '../_utils/apiController'
import { TextInput } from '../_components/ui/Inputs'
import { Check, Loader, Pencil, User, X } from 'lucide-react'
import AuthCheck from '../_hooks/AuthCheck'
import { AuthorInfo } from '../types'
import PhotoUploader from './PhotoUploader'


function AccountPage() {
    const {user, update} = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [isEditingPhoto, setIsEditingPhoto] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(()=>{
        setErrorMessage('')
    }, [isEditing, isSubmitting])

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
            setIsSubmitting(false)
            setIsEditing(false);
        }).catch(err => {
            console.error(err);
            setIsSubmitting(false)
            setErrorMessage("Something went wrong...")
        })
    }

    function UserDetails({u}: {u?: AuthorInfo}) {
        if (!u) return;
        return (
            <div className='my-2 grid gap-4'>
                <UserName />
                <p>Email: <em>{u.email}</em></p>
                <ProfilePhoto />
                <Link className={ButtonStyles.primary+' block w-fit'} href={logoutLink} >Log Out</Link>
            </div>
        )
    }

    function ProfilePhoto() {
        return (
            isEditingPhoto 
                    ? <PhotoUploader closeEditor={()=>setIsEditingPhoto(false)}/> 
                    : <>
                        <div className="flex w-full items-center gap-4">
                            <div className='size-40 rounded-full overflow-hidden'>{user?.photo ? <UserPhoto url={user.photo} name={user.name}/> : <User />}</div>
                            <button onClick={()=>setIsEditingPhoto(true)}><Pencil /></button>
                        </div>
                    </>
        )
    }

    function UserName() {
        return (
            isEditing
                ?   isSubmitting
                        ?   <div className="w-full h-6 bg-slate-500"><Loader className='animate-spin text-background2' size={20}/></div>
                        :   <form onSubmit={handleEdit} onReset={()=>setIsEditing(false)} className='flex items-center justify-between gap-2 w-full'>
                                <TextInput rest={{defaultValue: user?.name}} label='Name' name='name' className='grow'/>
                                <div className='flex gap-2'>
                                    <button type='submit' className='size-8 p-1 aspect-square rounded-full bg-green-600 text-background2 grid place-items-center'><Check /></button>
                                    <button type='reset' className='size-8 p-1 aspect-square rounded-full bg-red-600 text-background2 grid place-items-center'><X /></button>
                                </div>
                            </form>
                :   <div className='flex w-full items-center justify-between'>
                        <h3 className='font-heading font-bold my-2 text-xl'>Name: {user?.name}</h3>
                        <button onClick={()=>setIsEditing(true)}><Pencil /></button>
                    </div>
        )
    }

  return (
    <>
        <AuthCheck>
        <SectionHeading>Account Information</SectionHeading>
        <Card className='p-6 max-w-600 mx-auto relative'>
            <div className="relative w-full min-h-8">
                <p>{errorMessage && errorMessage}</p>
                
            </div>
            <UserDetails u={user} />
        </Card>
        </AuthCheck>
    </>
  )
}

export default AccountPage