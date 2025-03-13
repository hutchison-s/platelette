import RecipePage from './RecipePage';
import { notFound } from 'next/navigation';
import { MeasurementUnit, Recipe } from '@/app/types';

import { Metadata } from 'next';

export async function generateStaticParams() {
    const recipes: {items: Recipe[], count: number, cursor?: string} = await fetch('https://api.platelette.com/recipes').then(res => res.json())
    return recipes.items.map(each => {return {slug: each.slug}})
}

async function getRecipe(slug: string): Promise<Recipe> {
    const response = await fetch('https://api.platelette.com/recipes?slug='+slug).then(res => res.json())
    return response.items[0]
}

export async function generateMetadata({params}: {params: Promise<{slug: string}>}): Promise<Metadata> {
    const {slug} = await params;
    const r = await getRecipe(slug);
    return {
        title: r.title,
        description: r.description,
        openGraph: {
            title: r.title,
            description: `Recipe by ${r.author_name} on Platelette`,
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
    if (!r) return notFound();
    return (
        <>
            <RecipePage recipe={{...r, ingredients: [...r.ingredients.map(ing => {return {...ing, measure: ing.measure as MeasurementUnit}})]}} />
        </>
    )
}