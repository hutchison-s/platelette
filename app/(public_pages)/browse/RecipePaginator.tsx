'use client'

import RecipePreviewCard from '@/app/_components/cards/RecipePreviewCard';
import { ButtonStyles } from '@/app/_components/ui/Buttons';
import CheckboxTabs from '@/app/_components/ui/CheckboxTabs';
import SectionHeading from '@/app/_components/ui/SectionHeading';
import { useApiController } from '@/app/_hooks/useApiController';
import { Recipe } from '@/app/types';
import React, { useEffect, useState } from 'react';




const RecipePaginator: React.FC = () => {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [cursor, setCursor] = useState<string | null>(null);
    const [sort, setSort] = useState(0);
    const {Recipes} = useApiController();

    

    useEffect(()=>{
        const fetchRecipes = async (cursor: string | null) => {
            let response;
            if (sort == 0) {
                response = await Recipes().getPopular(cursor, 6);
            } else {
                response = await Recipes().getLatest(cursor, 6);
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
    }, [sort, Recipes])

    const loadMore = async (cursor: string | null) => {
        
            let response;
            if (sort == 0) {
                response = await Recipes().getPopular(cursor, 6);
            } else {
                response = await Recipes().getLatest(cursor, 6);
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