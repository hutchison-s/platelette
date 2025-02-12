import testData from '@/public/testdata.json'
import RecipePage from './RecipePage';
import { notFound } from 'next/navigation';
import { MeasurementUnit } from '@/app/types';

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

export default async function Page({params}: {params: Promise<{slug: string}>}) {
    const {slug} = await params;
    const r = getRecipe(slug);
    if (!r) return notFound();
    return (
        <>
            <head>
                <title>{r.title}</title>
                <meta name="description" content={"Platelette recipe: "+r.desc} />
                <meta property="og:title" content={r.title} />
                <meta property="og:description" content="Recipe on Platelette" />
                <meta property="og:image" content={r.photo} />
            </head>
            <RecipePage recipe={{...r, ingredients: [...r.ingredients.map(ing => {return {...ing, measure: ing.measure as MeasurementUnit}})]}} />
        </>
    )
}