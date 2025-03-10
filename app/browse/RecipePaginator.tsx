'use client'

import RecipePreviewCard from '@/app/_components/cards/RecipePreviewCard';
import { RecipeController } from '@/app/_utils/apiController';
import { Recipe } from '@/app/types';
import React, { useEffect, useState } from 'react';
import { ButtonStyles } from '../_components/ui/Buttons';
import SectionHeading from '../_components/ui/SectionHeading';
import CheckboxTabs from '../_components/ui/CheckboxTabs';



const RecipePaginator: React.FC = () => {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [cursor, setCursor] = useState<string | null>(null);
    const [sort, setSort] = useState(0);

    

    useEffect(()=>{
        const fetchRecipes = async (cursor: string | null) => {
            let response;
            if (sort == 0) {
                response = await new RecipeController().getPopular(cursor, 3);
            } else {
                response = await new RecipeController().getLatest(cursor, 3);
            }
            if (response) {
                const {items, cursor} = response;
                setRecipes(prev => {
                    console.log(prev.length);
                    return [...items];
                });
                setCursor(cursor ? encodeURIComponent(cursor) : null);
            }
        };
        setCursor(null);
        setRecipes([]);
        fetchRecipes(null)
    }, [sort])

    const loadMore = async (cursor: string | null) => {
        
            let response;
            if (sort == 0) {
                response = await new RecipeController().getPopular(cursor, 3);
            } else {
                response = await new RecipeController().getLatest(cursor, 3);
            }
            if (response) {
                const {items, cursor} = response;
                setRecipes(prevRecipes => [...prevRecipes, ...items]);
                setCursor(cursor ? encodeURIComponent(cursor) : null);
            }
    }

    return (
        <>
            <SectionHeading className='mb-4'>
                Browse Recipes
            </SectionHeading>
            <CheckboxTabs
                idx={sort}
                setIdx={setSort}
                labels={['Popular', 'Latest']}
            />
            <section className="grid gap-4 max-w-600 mx-auto md:max-w-[98%] md:grid-cols-2 xl:grid-cols-3">
                {recipes.map(r => <RecipePreviewCard recipe={r} key={r.id}/>)}
            </section>
            {cursor && (
                <button className={ButtonStyles.primary+' mx-auto block w-fit my-6'} onClick={() => loadMore(cursor)}>Load More</button>
            )}
        </>
    );
};

export default RecipePaginator;