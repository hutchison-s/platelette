import Card from "@/app/_components/cards/Card";
import SectionHeading from "./_components/ui/SectionHeading";
import RecipeList from "./_components/tools/RecipeList";
import Hero from "./_components/ui/Hero";

export default function Home() {
  return (
    <>
      <Hero />
      <div className="mt-[540px] sm:mt-[480px] md:mt-[620px] lg:mt-[540px]">
        <SectionHeading>Recipes</SectionHeading>
        <RecipeList/>     
        <Card className="grid place-items-center mt-4">
          <p className="text-center text-primary2 text-2xl font-heading font-bold">More to Come!</p>
          <p className="text-foreground">Check back soon for updates...</p>
        </Card>
      </div>
    </>
  );
}
