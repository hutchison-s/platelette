'use client'

import React, { useEffect, useState } from 'react'
import RecipePage from './[slug]/RecipePage';
import { Recipe } from '../types';
import { Loader } from 'lucide-react';
import { RecipeController } from '../_utils/apiController';
import { useSearchParams } from 'next/navigation';

function DynamicRecipe() {
    const searchParams = useSearchParams();
    const [recipe, setRecipe] = useState<Recipe>();

    useEffect(()=>{
        const getRecipe = (slug: string) => {
            const controller = new RecipeController();
            controller.getBySlug(slug).then(r => {
                if (!r || r?.count == 0) {
                    throw new Error('Invalid URL')
                } else {
                    setRecipe(r.items[0])
                }
            })
        }
        const slug = searchParams.get('name');
        if (!slug) throw new Error('Invalid URL')
        getRecipe(slug)
    }, [searchParams])

    return (
        recipe
            ? <RecipePage recipe={recipe} />
            : <Loader size={80} className='mx-auto my-6 animate-spin text-primary'/>
    )
}

export default DynamicRecipe