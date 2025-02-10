'use client'

import useQuery from "../_hooks/useQuery";

function SearchResults() {
    const [query, status] = useQuery();
    
    return <p>{status == 'success' ? query : status == 'loading' ? 'Loading...' : 'Error occurred. Try again.'}</p>
}

export default SearchResults;