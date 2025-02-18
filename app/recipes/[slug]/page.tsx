import testData from '@/public/testdata.json'
import RecipePage from './RecipePage';
import { notFound } from 'next/navigation';
import { MeasurementUnit, Recipe } from '@/app/types';
import unorm from 'unorm';

import { Metadata } from 'next';

const titleToSlug = (title: string) =>
    unorm.nfd(title)
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-') 
      .trim();

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