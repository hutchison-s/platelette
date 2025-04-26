'use client'

import React, { FormEventHandler, useEffect, useState } from 'react'
import Link from 'next/link'
import { Loader, Pencil, User } from 'lucide-react'
import Card from '@/app/_components/cards/Card'
import { ButtonStyles } from '@/app/_components/ui/Buttons'
import { TextInput, TextAreaInput } from '@/app/_components/ui/Inputs'
import SectionHeading from '@/app/_components/ui/SectionHeading'
import UserPhoto from '@/app/_components/ui/UserPhoto'
import { logoutLink } from '@/app/_utils/constants'
import { AuthorInfo } from '@/app/types'
import { useAuth } from '@/app/_hooks/useAuth'
import { useApiController } from '@/app/_hooks/useApiController'
import PhotoUploader from '@/app/_components/tools/PhotoUploader'

function Profile() {
    const {user, update} = useAuth();
    const {Users} = useApiController(); 
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
        const fd = new FormData(e.currentTarget);
        Users().update({
            ...user,
            name: fd.get('name') as string,
            bio: fd.get('bio') as string
        }, `/${user?.sub}`).then(res => {
            if (!res) throw new Error('Missing user update response')
            console.log(res);
            update({name: fd.get('name') as string, bio: fd.get('bio') as string});
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
                            <button onClick={()=>setIsEditing(e => !e)} className={'absolute top-1/2 right-0 -translate-y-1/2 p-1 rounded '+(isEditing ? 'bg-primary text-background2' : 'bg-transparent text-primary')} aria-label='Edit Profile'>
                                <Pencil aria-hidden='true'/>
                            </button>
                        </div>
                        <form onSubmit={handleEdit} onReset={()=>setIsEditing(false)} className='my-2 grid gap-4'>
                            <TextInput rest={{defaultValue: user?.name, disabled: !isEditing}} label='Name' name='name'/>
                            <TextInput rest={{value: user?.email, disabled: true}} label='Email' name='email'/>
                            <TextAreaInput rest={{defaultValue: user?.bio, disabled: !isEditing}}  textAreaClassName='resize-none' label='Bio' name='bio'/>
                            {isEditing && <div className='w-full flex justify-center items-center gap-2'>
                                <button type='submit' className={ButtonStyles.primary+' grow'}>Submit Changes</button>
                                <button type='reset' className={ButtonStyles.hollow+' grow'}>Cancel</button>
                            </div>}
                        </form>
                    </>
        )
    }

    function ProfilePhoto() {
        return (
            <>
                <div className="w-full grid place-items-center my-2 relative">
                    <div className='size-24 rounded-full overflow-hidden relative'>
                        {user?.photo 
                            ? <UserPhoto url={user.photo} name={user.name}/> 
                            : <User className='text-primary p-1 border-1 border-primary rounded-full' size={60}/>
                        }
                            
                    </div>
                    <button onClick={()=>setIsEditingPhoto(true)} className='bg-blue-600 text-background2 grid place-items-center p-1 rounded-full absolute bottom-0 left-1/2 translate-y-1/2 -translate-x-1/2'>
                                <Pencil />
                            </button>
                </div>
                <PhotoUploader isOpen={isEditingPhoto} closeEditor={()=>setIsEditingPhoto(false)} /> 
            </>
        )
    }

  return (
    <>
            <SectionHeading size='3xl'>Account Information</SectionHeading>
            <Card className='p-6 max-w-600 mx-auto relative'>
                
                <ProfilePhoto />
                <UserDetails u={user} />
                <Link className={ButtonStyles.primary+' block w-fit mx-auto my-4 mt-8'} href={logoutLink} >Log Out</Link>
            </Card>
    </>
  )
}

export default Profile