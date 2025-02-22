'use client'

import { ButtonStyles } from '@/app/_components/ui/Buttons'
import { Printer, Heart, Share } from 'lucide-react'
import React from 'react'

function RecipeButtons() {
  return (
    <div className="w-full flex justify-between print:hidden">
        <button onClick={()=>window.print()} className={ButtonStyles.hollow}><Printer /></button>
        <div className="flex gap-2">
            <button onClick={()=>navigator.share({url: window.location.href})} className={ButtonStyles.hollow}><Share /></button>
            <button className={ButtonStyles.primary}><Heart /></button>
        </div>
    </div>
  )
}

export default RecipeButtons