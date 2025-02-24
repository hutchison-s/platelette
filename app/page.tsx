import Card from "@/app/_components/cards/Card";
import SectionHeading from "./_components/ui/SectionHeading";
import RecipeList from "./_components/tools/RecipeList";
import Hero from "./_components/ui/Hero";
import { BodyText, FeaturedText } from "./_components/ui/Text";

export default function Home() {
  return (
    <>
      <Hero />
      <div className="mt-[540px] sm:mt-[480px] md:mt-[620px] lg:mt-[540px]">
        <SectionHeading>Recipes</SectionHeading>
        <RecipeList/>     
        <Card className="grid place-items-center mt-4">
          <FeaturedText>More to Come!</FeaturedText>
          <BodyText>Check back soon for updates...</BodyText>
        </Card>
      </div>
    </>
  );
}
