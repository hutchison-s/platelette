import RecipeList from "./tools/RecipeList";

function TopRecipes({limit = 3}: {limit?: number}) {
    return <RecipeList queryString={`sort=popular&limit=${limit}`} />
}

export default TopRecipes;