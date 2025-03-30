import { Metadata } from "next/types";
import SectionHeading from "../_components/ui/SectionHeading";
import AuthCheck from "../_hooks/AuthCheck";
import AICreate from "./AICreate";
// import RecipeForm from "./RecipeForm";

export const metadata: Metadata = {
  title: "New Recipe"
}

function CreatePage() {
  

  return (
    <div>
        <SectionHeading className="max-w-1000 mx-auto">New Recipe</SectionHeading>
        <AuthCheck>
          <div className="max-w-1000 mx-auto">
              {/* <RecipeForm /> */}
            <AICreate />
          </div>
        </AuthCheck>
    </div>
  )
}

export default CreatePage