'use client'

import RecipePreviewCard from "../cards/RecipePreviewCard";
import Card from "../cards/Card";
import {useRecipes} from "@/app/_hooks/useRecipes";

function RecipeList() {
    const {recipes, status} = useRecipes()

    return (
        <>
        {status == 'success'  
        &&  <section className="grid gap-4 max-w-600 mx-auto lg:max-w-full lg:grid-cols-2">
                {recipes.map(r => <RecipePreviewCard recipe={r} key={r.id}/>)}
            </section>}
        {status == 'loading' && <Card className="grid place-items-center text-3xl text-primary">Loading...</Card>}
        {status == 'error' && <Card className="grid place-items-center text-3xl text-primary">Something went wrong</Card>}
        </>
    )
}

export default RecipeList;