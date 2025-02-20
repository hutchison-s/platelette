import { Suspense } from "react";
import Card from "../_components/cards/Card";
import SectionHeading from "../_components/ui/SectionHeading";
import SearchResults from "./SearchResults";
import { Loader } from "lucide-react";

function SearchPage() {
    return (
        <>
            <SectionHeading>Search Results:</SectionHeading>
            <Suspense fallback={<Card>Loading... <Loader className="animate-spin text-primary mx-auto my-8" size={80}/></Card>}>
                <SearchResults />   
            </Suspense>
        </>
    )
}

export default SearchPage;