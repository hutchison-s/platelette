import RecipeList from "./tools/RecipeList";

function LatestRecipes({limit = 3}: {limit?: number}) {
    return <RecipeList queryString={`sort=latest&limit=${limit}`} />
}

export default LatestRecipes;