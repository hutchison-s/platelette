'use client'

import { useEffect, useState } from "react";
import { Loader } from "lucide-react";
import Card from "@/app/_components/cards/Card";
import RecipePreviewCard from "@/app/_components/cards/RecipePreviewCard";
import { LinkButton } from "@/app/_components/ui/Buttons";
import useQuery from "@/app/_hooks/useQuery";
import { fetchStatus, Recipe } from "@/app/types";
import SectionHeading from "@/app/_components/ui/SectionHeading";


function SearchResults() {
    const [query, status] = useQuery();
    const [results, setResults] = useState<Recipe[]>([])
    const [resultStatus, setResultStatus] = useState<fetchStatus>('loading');
    

    useEffect(()=>{
        if (status != 'success' || !query) return;
        const search = async () => {
            const res = await fetch(`https://api.platelette.com/recipes/search?query=${query}`);
            if (!res.ok) {
                throw new Error('Failed to fetch search results');
            }
            const data = await res.json();
            setResults(data);
            setResultStatus('success');
        }
        search().catch(err => {
            console.error(err);
            setResults([]);
            setResultStatus('error');
        })
            
    }, [status, query])

    function Switcher() {
        switch(true) {
        case status == 'success' && resultStatus == 'success' && results.length > 0:
            return <section className="grid gap-4 max-w-600 mx-auto md:max-w-[98%] md:grid-cols-2 xl:grid-cols-3">{results.map(r => <RecipePreviewCard recipe={{...r}} key={r.id} viewportAnimate={false}/>)}</section>;
        case status == 'success' && resultStatus == 'success' && results.length == 0:
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

    return (
        <>
            <SectionHeading>Search Results {status == 'success' ? `for ${query}` : ''}:</SectionHeading>
            <Switcher />
        </>
    )
    
}

export default SearchResults;