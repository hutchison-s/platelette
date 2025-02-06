import Card from "@/app/_components/cards/Card";
import SectionHeading from "./_components/ui/SectionHeading";
import RecipeList from "./_components/tools/RecipeList";

export default function Home() {
  return (
    <>
      <SectionHeading>New Recipes</SectionHeading>
      <section className="size-full grid place-itmes-center gap-4 max-w-600 mx-auto">
        <RecipeList/>
        <Card className="grid place-items-center">
          <p className="text-center text-primary2 text-2xl font-heading font-bold">More to Come!</p>
          <p className="text-foreground">Check back soon for updates...</p>
        </Card>

      </section>
    </>
  );
}
