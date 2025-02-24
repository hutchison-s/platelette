import Card from "@/app/_components/cards/Card";
import RecipePreviewCard from "@/app/_components/cards/RecipePreviewCard";
import { Recipe, RecipePreview } from "@/app/types";
import RecipeButtons from "./RecipeButtons";

export default function RecipePage({recipe}: {recipe: Recipe}) {
    return (
        <>
            <h2 className="text-4xl my-6 pb-4 font-heading text-secondary border-b-4 border-primary print:hidden">Recipe Details</h2>
            <section className="w-full grid lg:grid-cols-2 xl:grid-cols-[600px_1fr] gap-4">
                <RecipePreviewCard recipe={{...recipe} as RecipePreview} className="lg:h-fit"/>
                
                <Card className="text-foreground">
                    <RecipeButtons />
                    {recipe.yield && <p className="mb-2 text-center italic">{recipe.yield} servings</p>}
                    <p className="font-display text-xl font-light">Ingredients</p>
                    <div className="indent-4 pt-2 pb-8">
                        <ul>
                            {recipe.ingredients.map((ing, idx) => <li key={idx}>{ing.qty} {ing.measure}{ing.qty > 1 && 's'} {ing.name}</li>)}
                        </ul>
                    </div>
                    <p className="font-display text-xl font-light">Instructions</p>
                    <div className="indent-4 pt-2 pb-8">
                        <ul>
                            {recipe.instructions.map((m, idx) => <li key={idx}>{m}</li>)}
                        </ul>
                    </div>
                </Card>
            </section>
        </>
    )
}

