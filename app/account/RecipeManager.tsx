"use client"

import { useApiController } from '@/app/_hooks/useApiController'
import { useAuth } from '@/app/_hooks/useAuth';
import { fetchStatus, Recipe } from '@/app/types';
import { Loader, PlusCircle } from 'lucide-react';

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
    <SectionHeading size='3xl' className='flex justify-between items-center'><span>Your Recipes</span><LinkButton href='/create' className='flex gap-2 items-center w-fit text-center'>New Recipe <PlusCircle strokeWidth={1} /></LinkButton></SectionHeading>
    
    {status == 'loading'
        ?   <Loader size={80} className='text-primary animate-spin'/>
        :   <div className="grid gap-2 w-full">
                {recipes.sort((a,b)=>b.created - a.created).map(r => <SmallRecipeCard r={r} key={r.id}/>)}
            </div>}
    </>
  )
}

export default RecipeManager