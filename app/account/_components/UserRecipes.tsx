'use client'

import RecipePreviewCard from '@/app/_components/cards/RecipePreviewCard'
import HeadingWithLink from '@/app/_components/ui/HeadingWithLink'
import SectionHeading from '@/app/_components/ui/SectionHeading'
import useAPI from '@/app/_hooks/useAPI'
import { useAuth } from '@/app/_hooks/useAuth'
import { RecipeController } from '@/app/_utils/apiController'
import { AuthorInfo, Recipe } from '@/app/types'
import { AlertCircle, Loader } from 'lucide-react'
import React, { useCallback } from 'react'

function UserRecipes({profile}: {profile: AuthorInfo}) {
  const {user} = useAuth();

  const getRecipes = useCallback(async () => {
      const c = new RecipeController();
      return c.getByAuthor(profile.sub!);
    }
  , [profile.sub]);

  const {items, count, status} = useAPI<Recipe>(getRecipes)
  
  return (
    <>
        {user?.sub == profile.sub
          ? <HeadingWithLink href='/create' linkText='New Recipe' size='3xl'>
              Recipes
            </HeadingWithLink>
          : <SectionHeading size='3xl'>Recipes</SectionHeading>}
        {status == 'loading' && <Loader size={80} className='text-primary mx-auto my-4 animate-spin'/>}
        {status == 'error' && <AlertCircle size={80} className='text-primary mx-auto my-4' />}
        {status == 'success' && count == 0 && <p>No recipes to display</p>}
        {status == 'success' && count > 0 && <section className="grid gap-4 w-full">
                {items.map(r => <RecipePreviewCard recipe={r} key={r.id}/>)}
            </section>}

    </>
  )
}

export default UserRecipes