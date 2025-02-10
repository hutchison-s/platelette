import testData from '@/public/testdata.json'
import RecipePage from './RecipePage';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
    return testData.map(each => {
        return {slug: encodeURIComponent(each.title).replaceAll('%20', '_')}
        })
}

function getRecipe(slug: string) {
    return testData.find(each => encodeURIComponent(each.title).replaceAll('%20', '_') == slug);
}

export default async function Page({params}: {params: Promise<{slug: string}>}) {
    const {slug} = await params;
    const r = getRecipe(slug);
    if (!r) return notFound();
    return (
        <>
            <RecipePage recipe={r} />
        </>
    )
}