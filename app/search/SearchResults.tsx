'use client'

import { useEffect, useState } from "react";
import useFetch from "../_hooks/useFetch";
import useQuery from "../_hooks/useQuery";
import { Recipe } from "../types";
import RecipePreviewCard from "../_components/cards/RecipePreviewCard";
import Card from "../_components/cards/Card";
import { Loader } from "lucide-react";
import { LinkButton } from "../_components/ui/Buttons";

function SearchResults() {
    const [query, status] = useQuery();
    const [data, dataStatus] = useFetch<Recipe[]>('https://api.platelette.com/recipes');
    const [results, setResults] = useState<Recipe[]>([]);

    useEffect(()=>{
        if (status != 'success' || dataStatus != 'success' || !data) return;
        const queryFilter = (each: Recipe)=>{
            const fullText = each.desc+each.title+each.tags.join(',')+each.user.name;
            const queryTest = new RegExp(query || '', 'gi');
            return queryTest.test(fullText);
        }
        setResults(data.filter(queryFilter))
    }, [status, dataStatus, query, data])
    
    switch(true) {
        case status == 'success' && dataStatus == 'success' && results.length > 0:
            return <section className="grid gap-2">{results.map(r => <RecipePreviewCard recipe={{...r}} key={r.id}/>)}</section>;
        case status == 'success' && dataStatus == 'success' && results.length == 0:
            return <Card className="text-center"><p className="text-center my-8 text-2xl font-light">No results found</p><LinkButton href="/" className="mx-auto">Home</LinkButton></Card>
        case status == 'error' || dataStatus == 'error':
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