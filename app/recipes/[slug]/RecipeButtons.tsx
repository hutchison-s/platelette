'use client'

import LikeButton from '@/app/_components/tools/LikeButton'
import { ButtonStyles } from '@/app/_components/ui/Buttons'
import { Printer, Share } from 'lucide-react'
import React from 'react'

function RecipeButtons({recipe_id}: {recipe_id: string}) {
  return (
    <div className="w-full flex justify-between print:hidden">
        <button onClick={()=>window.print()} className={ButtonStyles.hollow}><Printer /></button>
        <div className="flex gap-2">
            <button onClick={()=>navigator.share({url: window.location.href})} className={ButtonStyles.hollow}><Share /></button>
            <LikeButton recipe_id={recipe_id}/>
        </div>
    </div>
  )
}

export default RecipeButtons