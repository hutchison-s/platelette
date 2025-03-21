'use client'

import RecipePreviewCard from "../cards/RecipePreviewCard";
import Card from "../cards/Card";
import { Loader } from "lucide-react";
import useFetch from "@/app/_hooks/useFetch";
import { ApiResponse, Recipe } from "@/app/types";

function RecipeList({queryString}: {queryString?: string}) {
    const [recipes, status] = useFetch<ApiResponse<Recipe>>(`https://api.platelette.com/recipes${queryString ? `?${queryString}` : ''}`)

    return (
        <>
        {status == 'success' && recipes &&  <section className="grid gap-4 max-w-600 mx-auto md:max-w-[98%] md:grid-cols-2 xl:grid-cols-3">
                {recipes.items.map(r => <RecipePreviewCard recipe={r} key={r.id}/>)}
            </section>}
        {status == 'loading' && <Card className="grid place-items-center text-3xl text-primary"><Loader size={120} className="text-primary mx-auto my-4 animate-spin"/></Card>}
        {status == 'error' && <Card className="grid place-items-center text-3xl text-primary">Something went wrong</Card>}
        </>
    )
}

export default RecipeList;