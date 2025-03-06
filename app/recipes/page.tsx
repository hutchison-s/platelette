import React, { Suspense } from 'react'
import DynamicRecipe from './DynamicRecipe'
import { Loader } from 'lucide-react'

function RecipePage() {
  return (
    <Suspense fallback={<Loader size={80} className='text-primary mx-auto my-6 animate-spin'/>}>
        <DynamicRecipe />
    </Suspense>
    
  )
}

export default RecipePage