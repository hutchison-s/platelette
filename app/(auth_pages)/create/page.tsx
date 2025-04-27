import { Metadata } from "next/types";
import AuthCheck from "../../_hooks/AuthCheck";
import PageWrapper from "../../_components/ui/PageWrapper";
import RecipeCreator from "./RecipeCreator";

export const metadata: Metadata = {
  title: "New Recipe"
}

function CreatePage() {
  

  return (
    <PageWrapper isNarrow>
        <AuthCheck>
            <RecipeCreator />
        </AuthCheck>
    </PageWrapper>
  )
}

export default CreatePage