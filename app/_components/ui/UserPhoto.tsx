import { User } from 'lucide-react'
import React from 'react'

function UserPhoto({url, name}: {url?: string, name?: string}) {
  return (
    (url && name)
        ? <img src={url} alt={"photo of "+name} width={'100%'} className="object-cover aspect-square"/>
        : <User className='w-full h-full aspect-square bg-primary rounded-full text-background2'/>
  )
}

export default UserPhoto