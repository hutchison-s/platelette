import Card from "@/app/_components/cards/Card";
import SectionHeading from "./_components/ui/SectionHeading";
import Hero from "./_components/ui/Hero";
import { BodyText, FeaturedText } from "./_components/ui/Text";
import LatestRecipes from "./_components/LatestRecipes";
import TopRecipes from "./_components/TopRecipes";

export default function Home() {
  return (
    <>
      <Hero />
      <div className="mt-[540px] sm:mt-[480px] md:mt-[620px] lg:mt-[540px]">
        <SectionHeading>Popular Recipes</SectionHeading>
        <TopRecipes limit={5} />  
        <SectionHeading>Latest Recipes</SectionHeading>
        <LatestRecipes limit={5} />     
           
        <Card className="grid place-items-center mt-4">
          <FeaturedText>More to Come!</FeaturedText>
          <BodyText>Check back soon for updates...</BodyText>
        </Card>
      </div>
    </>
  );
}
