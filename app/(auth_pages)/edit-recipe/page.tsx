import PageWrapper from '@/app/_components/ui/PageWrapper'
import React, { Suspense } from 'react'
import RecipeEditForm from '../account/RecipeEditForm'
import Link from 'next/link'
import { Loader } from 'lucide-react'

function EditPage() {
  return (
    <PageWrapper isNarrow>
        <Link href={'/account'} className="block text-md text-primary hover:underline py-4">
            &larr; Back to Account Page
        </Link>
        <Suspense fallback={
            <div className='w-full min-h-[400px] flex flex-col justify-center items-center gap-4'>
                <h2 className='font-heading text-3xl font-bold text-foreground'>Loading Recipe Edit Form...</h2>
                <Loader size={80} className='animate-spin text-primary my-6 mx-auto'/>
            </div>
        }>
            <RecipeEditForm />
        </Suspense>
        </PageWrapper>
  )
}

export default EditPage