import { AuthorInfo } from '@/app/types'
import React from 'react'
import { BodyText } from '../ui/Text'
import UserPhoto from '../ui/UserPhoto'
import Card from './Card'
import { ButtonStyles } from '../ui/Buttons'

function UserCard({profile}: {profile: AuthorInfo}) {
  return (
    <Card className='p-2 flex gap-4 md:gap-8 md:py-6 md:px-10 items-center justify-center max-w-800 mx-auto'>
            <div className='-mt-1 rounded-full overflow-hidden w-60 md:w-80 max-w-80 object-cover aspect-square border-1 border-background2 outline outline-4 outline-primary'>
                <UserPhoto name={profile.name} url={profile.photo}/>
            </div>
            <div className='flex flex-col justify-between gap-2 h-full min-h-[120px] min-w-[180px]'>
                <div className="grid gap-2">
                    <h2 className='font-heading font-bold text-secondary text-2xl md:text-5xl'>{profile.name}</h2>
                    <BodyText className='text-sm md:text-lg'>{profile.bio}</BodyText>
                </div>
                <button className={ButtonStyles.small+' block self-end'}>Follow</button>
            </div>
        </Card>
  )
}

export default UserCard