"use client"

import { useApiController } from '@/app/_hooks/useApiController'
import { useAuth } from '@/app/_hooks/useAuth';
import { fetchStatus, Recipe } from '@/app/types';
import { Loader } from 'lucide-react';

import React, { useEffect, useState } from 'react'
import { LinkButton } from '../_components/ui/Buttons';
import SmallRecipeCard from './SmallRecipeCard';
import SectionHeading from '../_components/ui/SectionHeading';




function RecipeManager() {
    const {user} = useAuth();
    const {Recipes} = useApiController();
    const [status, setStatus] = useState<fetchStatus>('loading');
    const [recipes, setRecipes] = useState<Recipe[]>([]);

    useEffect(()=>{
        if (!user || !Recipes) return;
        Recipes().getByAuthor(user!.sub!).then(response => {
            if (response) {
                setRecipes(response.items || [])
                setStatus('success')
            } else {
                setStatus('error')
            }
        })
    }, [user, Recipes])
  return (
    <>
    <SectionHeading size='3xl'>Your Recipes</SectionHeading>
    <LinkButton href='/create' className='block w-fit mx-auto my-2 text-center'>New Recipe</LinkButton>
    {status == 'loading'
        ?   <Loader size={80} className='text-primary animate-spin'/>
        :   <div className="grid gap-2 w-full">
                {recipes.sort((a,b)=>b.created - a.created).map(r => <SmallRecipeCard r={r} key={r.id}/>)}
            </div>}
    </>
  )
}

export default RecipeManager