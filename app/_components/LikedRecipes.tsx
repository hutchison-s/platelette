'use client'

import RecipePreviewCard from '@/app/_components/cards/RecipePreviewCard'
import SectionHeading from '@/app/_components/ui/SectionHeading'
import { useApiController } from '@/app/_hooks/useApiController'
import { AuthorInfo, Recipe } from '@/app/types'
import { AlertCircle, Loader } from 'lucide-react'
import React, { useEffect, useState } from 'react'

function LikedRecipes({profile}: {profile: AuthorInfo}) {
  const {Users} = useApiController();
  
  const [items, setItems] = useState<Recipe[]>([]);
  const [count, setCount] = useState(0);
  const [status, setStatus] = useState<'loading' | 'error' | 'success'>('loading');

  useEffect(() => {
    const getRecipes = async () => {
      try {
        const response = await Users().getLikedRecipes(profile.sub!);
        console.log()
        setItems(response?.items || []);
        setCount(response?.count || 0);
        setStatus('success');
      } catch (error) {
        setStatus('error');
        console.log(error)
      }
    };

    getRecipes();
  }, [profile.sub, Users]);

  return (
    <>
      <SectionHeading size='3xl'>Favorites</SectionHeading>
      
      {status == 'loading' && <Loader size={80} className='text-primary mx-auto my-4 animate-spin'/>}
      {status == 'error' && <AlertCircle size={80} className='text-primary mx-auto my-4' />}
      {status == 'success' && count == 0 && <p>No recipes to display</p>}
      {status == 'success' && count > 0 && (
        <section className="grid gap-4 w-full">
          {items.map(r => <RecipePreviewCard recipe={r} key={'favorite'+r.id}/>)}
        </section>
      )}
    </>
  );
}

export default LikedRecipes;
