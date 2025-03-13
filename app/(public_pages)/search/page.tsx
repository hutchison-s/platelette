import { Suspense } from "react";
import SearchResults from "./SearchResults";
import { Loader } from "lucide-react";
import Card from "@/app/_components/cards/Card";
import SectionHeading from "@/app/_components/ui/SectionHeading";

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