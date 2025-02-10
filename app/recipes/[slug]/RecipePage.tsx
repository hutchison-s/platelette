import Card from "@/app/_components/cards/Card";
import RecipePreviewCard from "@/app/_components/cards/RecipePreviewCard";
import { Recipe } from "@/app/types";

export default function RecipePage({recipe}: {recipe: Recipe}) {
    return (
        <>
            <h2 className="text-4xl my-6 pb-4 font-heading text-secondary border-b-4 border-primary">Recipe Details</h2>
            <RecipePreviewCard recipe={recipe} />
            <Card className="mt-4">
                <p className="font-display text-xl font-light">Ingredients</p>
                <div className="indent-4 pt-2 pb-8">
                    <ul>
                        <li>things</li>
                        <li>salt</li>
                        <li>pepper</li>
                    </ul>
                </div>
                <p className="font-display text-xl font-light">Instructions</p>
                <div className="indent-4 pt-2 pb-8">
                    <ul>
                        <li>preheat</li>
                        <li>bake</li>
                        <li>serve</li>
                    </ul>
                </div>
            </Card>
        </>
    )
}

