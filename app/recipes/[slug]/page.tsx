import RecipePage from './RecipePage';
import { notFound } from 'next/navigation';
import { MeasurementUnit, Recipe } from '@/app/types';

import { Metadata } from 'next';

export async function generateStaticParams() {
    const recipes: Recipe[] = await fetch('https://api.platelette.com/recipes').then(res => res.json())
    return recipes.map(each => {return {slug: each.slug}})
}

function getRecipe(slug: string): Promise<Recipe> {
    return fetch('https://api.platelette.com/slugs/'+slug).then(res => res.json());
}

export async function generateMetadata({params}: {params: Promise<{slug: string}>}): Promise<Metadata> {
    const {slug} = await params;
    const r = await getRecipe(slug);
    return {
        title: r.title,
        description: r.description,
        openGraph: {
            title: r.title,
            description: `Recipe by ${r.author.name} on Platelette`,
            images: [{
                url: r.photo,
                width: 1200,
                height: 600
            }]
        }
    }
}

export default async function Page({params}: {params: Promise<{slug: string}>}) {
    const {slug} = await params;
    const r = await getRecipe(slug);
    console.log('retrieved', r)
    if (!r) return notFound();
    return (
        <>
            <RecipePage recipe={{...r, ingredients: [...r.ingredients.map(ing => {return {...ing, measure: ing.measure as MeasurementUnit}})]}} />
        </>
    )
}