import { AuthorInfo } from '@/app/types'
import React from 'react'
import { BodyText } from '../ui/Text'
import UserPhoto from '../ui/UserPhoto'
import Card from './Card'
import FollowButton from '../tools/FollowButton'

function UserCard({profile}: {profile: AuthorInfo}) {
  return (
    <Card className='p-2 flex gap-2 md:gap-4 md:py-6 md:px-6 justify-start items-start max-w-800 mx-auto'>
            <div className='-mt-1 rounded-full overflow-hidden w-20 md:w-30 max-w-30 object-cover aspect-square border-1 border-background2 outline outline-4 outline-primary'>
                <UserPhoto name={profile.name} url={profile.photo}/>
            </div>
            <div className='flex flex-col grow justify-between gap-2 h-full min-h-[120px] min-w-[180px]'>
                <div className="grid gap-1">
                    <h2 className='font-heading font-bold text-secondary text-xl md:text-2xl'>{profile.name}</h2>
                    <BodyText className='text-sm md:text-lg leading-normal'>{profile.bio}</BodyText>
                </div>
                <div className="w-full flex justify-end">
                    <FollowButton target_user_id={profile.sub} />
                </div>
            </div>
        </Card>
  )
}

export default UserCard