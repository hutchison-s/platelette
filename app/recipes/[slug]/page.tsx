import testData from '@/public/testdata.json'
import RecipePage from './RecipePage';
import { notFound } from 'next/navigation';
import { MeasurementUnit, Recipe } from '@/app/types';
import { Metadata } from 'next';

function titleToSlug(title: string) {
    return title.toLowerCase().replaceAll(/\s*\b(a|an|the|of|in|from|on|at|to|by|for|about|as|into|like|through|after|over|between|against|under|without|before|within|along|during|around|among)\b\s+/gi, '').trim().replaceAll(/\s+/g, '-')
}

export function generateStaticParams() {
    return testData.map(each => {
        return {slug: titleToSlug(each.title)}
        })
}

function getRecipe(slug: string) {
    return testData.find(each => titleToSlug(each.title) == slug);
}

export async function generateMetadata({params}: {params: Promise<{slug: string}>}): Promise<Metadata> {
    const {slug} = await params;
    const r = getRecipe(slug) as Recipe;
    return {
        title: r.title,
        description: r.desc,
        openGraph: {
            title: r.title,
            description: 'Recipe on Platelette',
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
    const r = getRecipe(slug);
    if (!r) return notFound();
    return (
        <>
            <RecipePage recipe={{...r, ingredients: [...r.ingredients.map(ing => {return {...ing, measure: ing.measure as MeasurementUnit}})]}} />
        </>
    )
}