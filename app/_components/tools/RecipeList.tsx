'use client'

import useFetch from "@/app/_hooks/useFetch";
import RecipePreviewCard from "../cards/RecipePreviewCard";
import Card from "../cards/Card";
import { RecipePreviewList } from "@/app/types";

  

function RecipeList() {
    const [data, status] = useFetch<RecipePreviewList>('https://api.platelette.com/recipes');

    return (
        <>
        {status == 'success' 
        &&  data 
        &&  <section className="grid gap-4 max-w-600 mx-auto lg:max-w-full lg:grid-cols-2">
                {data.map(r => <RecipePreviewCard recipe={r} key={r.id}/>)}
            </section>}
        {status == 'loading' && <Card className="grid place-items-center text-3xl text-primary">Loading...</Card>}
        {status == 'error' && <Card className="grid place-items-center text-3xl text-primary">Something went wrong</Card>}
        </>
    )
}

export default RecipeList;