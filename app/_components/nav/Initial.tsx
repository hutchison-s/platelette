'use client'

import { useAuth } from '@/app/_hooks/useAuth'
import React from 'react'

function Initial() {
    const {user} = useAuth()
  return (
    user && <div className='size-8 text-sm aspect-square rounded-full border-1 border-background2 text-background2 font-light font-body grid place-items-center'>{user[0].toUpperCase()}</div>
  )
}

export default Initial