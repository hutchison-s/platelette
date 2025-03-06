import { Metadata } from "next/types";
import Card from "../_components/cards/Card";
import SectionHeading from "../_components/ui/SectionHeading";
import AuthCheck from "../_hooks/AuthCheck";
import RecipeForm from "./RecipeForm";

export const metadata: Metadata = {
  title: "New Recipe"
}

function CreatePage() {
  

  return (
    <div>
        <SectionHeading className="max-w-800 mx-auto">New Recipe</SectionHeading>
        <AuthCheck>
          <Card className="grid place-items-center max-w-800 mx-auto">
              <RecipeForm />
          </Card>
        </AuthCheck>
    </div>
  )
}

export default CreatePage