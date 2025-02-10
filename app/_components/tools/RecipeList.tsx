'use client'

import useFetch from "@/app/_hooks/useFetch";
import RecipePreviewCard from "../cards/RecipePreviewCard";
import Card from "../cards/Card";

type User = {
    name: string;
    photo: string;
  };
  
  type Recipe = {
    id: number;
    title: string;
    desc: string;
    tags: string[];
    photo: string;
    timestamp: string;
    user: User;
  };
  
  type RecipePreviewList = Recipe[];
  

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