import Card from "@/app/_components/cards/Card";
import SectionHeading from "./_components/ui/SectionHeading";
import Hero from "./_components/ui/Hero";
import { BodyText, FeaturedText } from "./_components/ui/Text";
import LatestRecipes from "./_components/LatestRecipes";
import TopRecipes from "./_components/TopRecipes";
import PageWrapper from "./_components/ui/PageWrapper";
import { Suspense } from "react";
import HeroLoading from "./_components/ui/HeroLoading";
import ScrollTop from "./_components/tools/ScrollTop";

export default function Home() {
  return (
    <>
        
        <Suspense fallback={<HeroLoading />}>
          <Hero />
          <ScrollTop />
        </Suspense>
        
        <PageWrapper>
          <SectionHeading>Popular Recipes</SectionHeading>
          <TopRecipes limit={6} />
          <SectionHeading>Latest Recipes</SectionHeading>
          <LatestRecipes limit={6} />
          
          <Card className="grid place-items-center mt-4">
            <FeaturedText>More to Come!</FeaturedText>
            <BodyText>Check back soon for updates...</BodyText>
          </Card>
        </PageWrapper>
    </>
  );
}
