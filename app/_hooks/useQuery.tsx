'use client'

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchStatus } from "../types";

function useQuery(): [query: string | null, status: fetchStatus] {
    const params = useSearchParams();
    const [query, setQuery] = useState<string | null>(null);
    const [status, setStatus] = useState<fetchStatus>("loading");


    useEffect(()=>{
        try {
            const q = params.get('query')
            setQuery(q);
            setStatus('success');
        } catch (error) {
            setStatus('error')
            console.error(error)
        }
    }, [params])

    return [query, status];
}

export default useQuery;