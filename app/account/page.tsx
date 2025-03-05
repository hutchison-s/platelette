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
import { TextAreaInput, TextInput } from '../_components/ui/Inputs'
import { Loader, Pencil, User } from 'lucide-react'
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
            name: fd.get('name') as string,
            bio: fd.get('bio') as string
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
            isSubmitting
                ?   <div className="w-full h-8 bg-slate-300 py-2 rounded flex justify-center"><Loader className='animate-spin text-background2' size={24}/></div>
                :   <>
                        <div className="relative w-full min-h-8">
                            <p>{errorMessage && errorMessage}</p>
                            <button onClick={()=>setIsEditing(true)} className='absolute top-1/2 right-0 -translate-y-1/2' aria-label='Edit Profile'>
                                <Pencil aria-hidden='true' className={isEditing ? 'bg-primary text-background2' : 'bg-transparent text-primary'}/>
                            </button>
                        </div>
                        <form onSubmit={handleEdit} onReset={()=>setIsEditing(false)} className='my-2 grid gap-4'>
                            <TextInput rest={{defaultValue: user?.name, disabled: !isEditing}} label='Name' name='name'/>
                            <TextInput rest={{value: user?.email, disabled: true}} label='Email' name='email'/>
                            <TextAreaInput rest={{defaultValue: user?.bio, disabled: !isEditing}} label='Bio' name='bio'/>
                            <div className='w-full flex justify-center items-center gap-2'>
                                <button type='submit' className={ButtonStyles.primary+' grow'}>Submit Changes</button>
                                <button type='reset' className={ButtonStyles.hollow+' grow'}>Cancel</button>
                            </div>
                        </form>
                    </>
        )
    }

    function ProfilePhoto() {
        return (
            <>
                <div className="w-full grid place-items-center p-2">
                    <div className='size-24 rounded-full overflow-hidden relative'>
                        {user?.photo 
                            ? <UserPhoto url={user.photo} name={user.name}/> 
                            : <User className='text-primary p-1 border-1 border-primary rounded-full' size={60}/>
                        }
                        <button onClick={()=>setIsEditingPhoto(true)} className='bg-blue-600 text-background2 grid place-items-center p-1 rounded-full absolute bottom-0 left-1/2 -translate-x-1/2'><Pencil /></button>
                    </div>
                </div>
                <PhotoUploader isOpen={isEditingPhoto} closeEditor={()=>setIsEditingPhoto(false)} /> 
            </>
        )
    }

  return (
    <>
        <AuthCheck>
        <SectionHeading>Account Information</SectionHeading>
        <Card className='p-6 max-w-600 mx-auto relative'>
            
            <ProfilePhoto />
            <UserDetails u={user} />
            <Link className={ButtonStyles.primary+' block w-fit'} href={logoutLink} >Log Out</Link>
        </Card>
        </AuthCheck>
    </>
  )
}

export default AccountPage