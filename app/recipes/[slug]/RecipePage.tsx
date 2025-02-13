import Card from "@/app/_components/cards/Card";
import RecipePreviewCard from "@/app/_components/cards/RecipePreviewCard";
import { Button } from "@/app/_components/ui/Buttons";
import { Recipe, RecipePreview } from "@/app/types";
import { Heart, Printer, Share } from "lucide-react";

export default function RecipePage({recipe}: {recipe: Recipe}) {
    return (
        <>
            <h2 className="text-4xl my-6 pb-4 font-heading text-secondary border-b-4 border-primary">Recipe Details</h2>
            <RecipePreviewCard recipe={{...recipe} as RecipePreview} />
            <Card className="mt-4 text-foreground">
                <div className="w-full flex justify-between">
                    <Button><Printer /></Button>
                    <div className="flex gap-2">
                        <Button><Share /></Button>
                        <Button><Heart /></Button>
                    </div>
                </div>
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
                        {recipe.method.map((m, idx) => <li key={idx}>{m}</li>)}
                    </ul>
                </div>
            </Card>
        </>
    )
}

