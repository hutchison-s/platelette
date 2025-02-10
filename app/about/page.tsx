import Card from "../_components/cards/Card";
import SectionHeading from "../_components/ui/SectionHeading";

function AboutPage() {
    return (
        <>
            <SectionHeading>What is Platelette?</SectionHeading>
            <p className="text-foreground font-body">Platelette is a dynamic recipe-sharing social web app designed for food lovers like you. It&apos;s not just about cooking—it&apos;s about connecting, creating, and sharing your culinary journey with a global community. Whether you&apos;re a home cook, a seasoned chef, or someone who loves to try new flavors, Platelette brings inspiration to your kitchen and lets you share your passion for food with the world.</p>

    <SectionHeading>What You Can Do with Platelette:</SectionHeading>
    <ul>
      <li >
        <Card className="min-h-fit my-4">
            <strong className="text-primary text-xl drop-shadow-lg">Discover New Recipes</strong>  
            <p className="my-2 text-foreground">Browse a vast collection of recipes from around the world, tailored to your tastes and cooking level. Whether you&apos;re in the mood for comfort food or adventurous global flavors, there&apos;s something new to try every day.</p>
        </Card>
      </li>
      <li >
      <Card className="min-h-fit my-4">
        <strong className="text-primary text-xl drop-shadow-lg">See What Your Friends Are Cooking</strong>  
        <p className="my-2 text-foreground">Connect with friends and follow their culinary adventures. Get inspired by their dishes and share your own creations, bringing the joy of food into your social circle.</p>
        </Card>
      </li>
      <li >
      <Card className="min-h-fit my-4">
        <strong className="text-primary text-xl drop-shadow-lg">Get AI Assistance Crafting New Recipes</strong>  
        <p className="my-2 text-foreground">Need a little help getting creative in the kitchen? Let Platelette&apos;s AI assistant guide you in crafting the perfect dish, whether you&apos;re experimenting with new ingredients or perfecting your favorite recipe.</p>
        </Card>
      </li>
      <li >
      <Card className="min-h-fit my-4">
        <strong className="text-primary text-xl drop-shadow-lg">Share Your Favorite Dishes with the World</strong>  
        <p className="my-2 text-foreground">Upload your recipes, add your personal touch, and share them with a community that appreciates great food. Platelette makes it easy to inspire others with your culinary masterpieces and discover new ideas to try.</p>
        </Card>
      </li>
    </ul>

    <SectionHeading>Why Platelette?</SectionHeading>
    <p className=" text-foreground">Platelette is more than just a recipe app—it&apos;s a platform to celebrate food, creativity, and community. Whether you&apos;re exploring new ingredients or looking for a recipe to impress your friends, Platelette is here to help you grow your culinary skills and share the love for cooking.</p>

    <p className="my-4 text-foreground">Join Platelette today and turn your kitchen into a place for discovery, inspiration, and connection.</p>
        </>
    )
}

export default AboutPage;