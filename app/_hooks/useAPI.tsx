'use client'

import { useEffect, useState } from "react";
import { ApiResponse, fetchStatus } from "../types";

const initial = { items: [], count: 0, cursor: null };

function useAPI<T>(callback: () => Promise<ApiResponse<T> | null>) {
    const [data, setData] = useState<ApiResponse<T>>(initial);
    const [status, setStatus] = useState<fetchStatus>("loading");

    useEffect(() => {
        let isMounted = true; // Prevent state updates if component unmounts
        const fetchData = async () => {
            setStatus("loading");
            try {
                const result = await callback();
                if (isMounted) {
                    setData(result || initial);
                    setStatus("success");
                }
            } catch (err) {
                if (isMounted) {
                    setStatus("error");
                    console.error("Fetch error:", err);
                }
            }
        };
        fetchData();

        return () => {
            isMounted = false; 
        };
    }, [callback]);

    return { ...data, status };
}

export default useAPI;
