'use client'

import { useEffect, useState } from "react"
import { fetchStatus } from "../types";

function useFetch<T>(url: string): [data: T | undefined, status: fetchStatus] {
    const [data, setData] = useState<T | undefined>();
    const [status, setStatus] = useState<fetchStatus>("loading");
    useEffect(()=>{
        setStatus('loading');
        try {
            fetch(url)
                .then(res => res.json())
                .then(json => {
                    setData(json);
                });
        } catch (err) {
            setStatus('error');
            console.error("Fetch error occurred:", err);
        }
        
    }, [url])

    useEffect(()=>{
        if (data != undefined) {
            setStatus('success')
        }
    }, [data])

    return [data, status]
}

export default useFetch;