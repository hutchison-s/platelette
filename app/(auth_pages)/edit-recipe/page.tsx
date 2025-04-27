import PageWrapper from '@/app/_components/ui/PageWrapper'
import React from 'react'
import RecipeEditForm from '../account/RecipeEditForm'
import Link from 'next/link'

function EditPage() {
  return (
    <PageWrapper isNarrow>
        <Link href={'/account'} className="block text-md text-primary hover:underline py-4">
            &larr; Back to Account Page
        </Link>
        <RecipeEditForm />
        </PageWrapper>
  )
}

export default EditPage