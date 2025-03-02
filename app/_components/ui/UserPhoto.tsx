import { User } from 'lucide-react'
import React from 'react'

function UserPhoto({url, name}: {url?: string, name?: string}) {
  return (
    (url && name)
        ? <img src={url} alt={"photo of "+name} width={'100%'} className="object-cover"/>
        : <User className='w-full aspect-square bg-primary rounded-full text-background2'/>
  )
}

export default UserPhoto