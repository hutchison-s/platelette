'use client'

import { useEffect, useState } from "react"

type fetchStatus = "loading" | "success" | "error"

function useFetch<T>(url: string): [data: T | undefined, status: fetchStatus] {
    const [data, setData] = useState<T | undefined>();
    const [status, setStatus] = useState<fetchStatus>("loading");
    useEffect(()=>{
        setStatus('loading');
        try {
            fetch(url)
                .then(res => res.json())
                .then(json => {
                    setData(json.data);
                    setStatus('success');
                });
        } catch (err) {
            setStatus('error');
            console.error("Fetch error occurred:", err);
        }
        
    }, [url])

    return [data, status]
}

export default useFetch;