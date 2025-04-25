import { Metadata } from "next/types";
import SectionHeading from "../_components/ui/SectionHeading";
import AuthCheck from "../_hooks/AuthCheck";
import AICreate from "./AICreate";
import PageWrapper from "../_components/ui/PageWrapper";
// import RecipeForm from "./RecipeForm";

export const metadata: Metadata = {
  title: "New Recipe"
}

function CreatePage() {
  

  return (
    <PageWrapper isNarrow>
        <SectionHeading>New Recipe</SectionHeading>
        <AuthCheck>
              {/* <RecipeForm /> */}
            <AICreate />
        </AuthCheck>
    </PageWrapper>
  )
}

export default CreatePage