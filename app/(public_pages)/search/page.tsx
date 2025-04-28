import { Suspense } from "react";
import SearchResults from "./SearchResults";
import { Loader } from "lucide-react";
import Card from "@/app/_components/cards/Card";
import RecipeSearch from "@/app/_components/tools/RecipeSearch";

function SearchPage() {
    return (
        <>  
            <div className="w-full max-w-[400px] mx-auto bg-secondary/50 p-2 justify-center items-center flex rounded-full my-2">
                <RecipeSearch />
            </div>
            
            <Suspense fallback={<Card>Loading... <Loader className="animate-spin text-primary mx-auto my-8" size={80}/></Card>}>
                <SearchResults />   
            </Suspense>
        </>
    )
}

export default SearchPage;