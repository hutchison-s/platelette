import Card from "@/app/_components/cards/Card";
import RecipePreviewCard from "./_components/cards/RecipePreviewCard";

export default function Home() {
  return (
    <>
      <section className="size-full grid place-itmes-center gap-2 max-w-600 mx-auto">
        
        <RecipePreviewCard
          recipe={{
            title: 'Chilaquiles Verdes Topped with Fried Egg',
            desc: 'Delicious Mexican breakfast as spicy as you can handle, featuring crispy tortilla chips smothered in tangy salsa verde, crema, and fresh cilantro.',
            tags: ['Breakfast', 'Mexican', 'Spicy'],
            photo: 'https://www.seriouseats.com/thmb/wceJtot3qMjXcVAnk6PBw_OhxRw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/chilaquiles-verdes-fried-eggs-hero-01_1-d18b82d02fa54c92a05e66881e906814.JPG',
            timestamp: new Date().toLocaleDateString(),
            user: {
              name: 'Jonathan Salazo',
              photo: "https://randomuser.me/api/portraits/thumb/men/89.jpg"
            }
          }}
        />
        <Card className="grid place-items-center">
          <p className="text-center text-primary2 text-2xl font-heading font-bold">More to Come!</p>
          <p className="text-foreground">Check back soon for updates...</p>
        </Card>

      </section>
    </>
  );
}
