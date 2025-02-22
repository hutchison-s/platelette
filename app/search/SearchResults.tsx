'use client'

import { useEffect, useState } from "react";
import useQuery from "../_hooks/useQuery";
import { Recipe } from "../types";
import RecipePreviewCard from "../_components/cards/RecipePreviewCard";
import Card from "../_components/cards/Card";
import { Loader } from "lucide-react";
import { LinkButton } from "../_components/ui/Buttons";
import { useRecipes } from "../_hooks/useRecipes";

function SearchResults() {
    const [query, status] = useQuery();
    const {recipes} = useRecipes();
    const [filtered, setFiltered] = useState(recipes)

    useEffect(()=>{
        if (status != 'success' || !recipes) return;
        const queryFilter = (each: Recipe)=>{
            const fullText = [each.description, each.title, each.tags.join(','), each.author.name].join(' ');
            const queryTest = new RegExp(query || ' ', 'gi');
            return queryTest.test(fullText);
        }
        setFiltered(recipes.filter(queryFilter));
    }, [status, query, recipes])
    
    switch(true) {
        case status == 'success' && recipes.length > 0:
            return <section className="grid gap-2">{filtered.map(r => <RecipePreviewCard recipe={{...r}} key={r.id}/>)}</section>;
        case status == 'success' && recipes.length == 0:
            return <Card className="text-center"><p className="text-center my-8 text-2xl font-light">No results found</p><LinkButton href="/" className="mx-auto">Home</LinkButton></Card>
        case status == 'error':
            return <Card>
                <p>Error loading results...</p>
            </Card>
        default:
            return <Card>
                <p>Loading...</p>
                <Loader className="text-primary animate-spin mx-auto my-8" size={80} />
            </Card>
    }
}

export default SearchResults;