'use client'

import React, { useEffect, useState } from 'react'
import RecipePage from './[slug]/RecipePage';
import { Recipe } from '../types';
import { Loader } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import Head from 'next/head';
import NotFound from '../not-found';
import { useApiController } from '../_hooks/useApiController';

function DynamicRecipe() {
    const searchParams = useSearchParams();
    const [recipe, setRecipe] = useState<Recipe>();
    const [error, setError] = useState<string>();
    const {Recipes} = useApiController();
    

    useEffect(()=>{
        const getRecipe = (slug: string) => {
            Recipes.getBySlug(slug).then(r => {
                if (!r || r?.count == 0) {
                    throw new Error('Invalid URL')
                } else {
                    setRecipe(r.items[0])
                }
            }).catch(e => {
                console.error(e)
                setError(e.message || 'Error')
            }
            )
        }
        const slug = searchParams.get('name');
        if (!slug) throw new Error('Invalid URL')
        getRecipe(slug)
    }, [searchParams, Recipes])

    if (error) {
        return <NotFound />
    }
    if (!recipe) {
        return <Loader size={80} className='mx-auto my-6 animate-spin text-primary'/>
    }

    return (
        <>
            <Head>
                <title>{recipe.title}</title>
                <meta name="description" content={recipe.description} />
                <meta name="og:description" content={`Recipe by ${recipe.author_name} on Platelette.com`} />
                <meta name="og:title" content={recipe.title} />
                <meta property='og:image' content={recipe.photo} />
            </Head>
            <RecipePage recipe={recipe} />
        </>
    )
}

export default DynamicRecipe