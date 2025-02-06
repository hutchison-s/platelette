import { Suspense } from "react";
import Card from "../_components/cards/Card";
import SectionHeading from "../_components/ui/SectionHeading";
import SearchResults from "./SearchResults";

function SearchPage() {
    return (
        <>
            <SectionHeading>Search Results:</SectionHeading>
            <Card>
                <Suspense fallback='Loading...'>
                    <SearchResults />   
                </Suspense>
                
            </Card>
        </>
    )
}

export default SearchPage;