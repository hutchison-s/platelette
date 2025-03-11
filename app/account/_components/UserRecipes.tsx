'use client'

import RecipePreviewCard from '@/app/_components/cards/RecipePreviewCard'
import HeadingWithLink from '@/app/_components/ui/HeadingWithLink'
import SectionHeading from '@/app/_components/ui/SectionHeading'
import { useApiController } from '@/app/_hooks/useApiController'
import { useAuth } from '@/app/_hooks/useAuth'
import { AuthorInfo, Recipe } from '@/app/types'
import { AlertCircle, Loader } from 'lucide-react'
import React, { useEffect, useState } from 'react'

function UserRecipes({profile}: {profile: AuthorInfo}) {
  const {user} = useAuth();
  const {Recipes} = useApiController();
  
  const [items, setItems] = useState<Recipe[]>([]);
  const [count, setCount] = useState(0);
  const [status, setStatus] = useState<'loading' | 'error' | 'success'>('loading');

  useEffect(() => {
    const getRecipes = async () => {
      try {
        const response = await Recipes.getByAuthor(profile.sub!);
        setItems(response?.items || []);
        setCount(response?.count || 0);
        setStatus('success');
      } catch (error) {
        setStatus('error');
        console.log(error)
      }
    };

    getRecipes();
  }, [profile.sub, Recipes]);

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
      {status == 'success' && count > 0 && (
        <section className="grid gap-4 w-full">
          {items.map(r => <RecipePreviewCard recipe={r} key={r.id}/>)}
        </section>
      )}
    </>
  );
}

export default UserRecipes;
