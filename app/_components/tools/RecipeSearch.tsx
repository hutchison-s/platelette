
import { Search } from "lucide-react";

function RecipeSearch() {

    return (
        <form action={'/search'} className="flex gap-2 items-center print:hidden">
            <label htmlFor="query" className="hidden">Search</label>
            <input type="search" name="query" id="query" placeholder="Search..." className="bg-black/25 border-1 border-background rounded-full py-1 px-3 text-white h-fit w-50 placeholder:text-background/75"/>
            <button type="submit" aria-label="Search" className="text-white border-1 p-1 rounded-std"><Search /></button>
        </form>
    )
}

export default RecipeSearch;