'use client'

import React, { useEffect, useState } from 'react'
import RecipePage from './[slug]/RecipePage';
import { Recipe } from '../types';
import { Loader } from 'lucide-react';
import { RecipeController } from '../_utils/apiController';
import { useSearchParams } from 'next/navigation';
import Head from 'next/head';

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
        <>
            <Head>
                <title>{recipe ? recipe.title : 'Loading Recipe'}</title>
                <meta name="description" content={recipe ? recipe.description : 'Recipe on Platelette.com'} />
                <meta name="og:description" content={recipe ? `Recipe by ${recipe.author.name} on Platelette.com` : 'Recipe on Platelette.com'} />
                <meta name="og:title" content={recipe ? recipe.title : 'Platelette Recipe'} />
                <meta property='og:image' content={recipe ? recipe.photo : '/logo-red.png'} />
                
            </Head>
        {recipe
            ? <RecipePage recipe={recipe} />
            : <Loader size={80} className='mx-auto my-6 animate-spin text-primary'/>}
        </>
    )
}

export default DynamicRecipe