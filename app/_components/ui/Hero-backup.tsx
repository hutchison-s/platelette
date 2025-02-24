import Card from "../cards/Card";

function Hero() {
    return (
        <Card className="my-12 hero-bg bg-cover">
            <section className="flex p-xtra gap-8 items-center flex-wrap lg:flex-nowrap ">
            <div className="bg-gradient-to-br from-white to-stone-200 bg-clip-text grid leading-none flex-2 text-transparent font-bold font-body uppercase drop-shadow-2xl text-[3.5rem] sm:text-[3.5rem] md:text-[4.5rem]">
                DISCOVER<br/>SHARE<br/>SAVOR
            </div>
            <div className="flex-3 p-xtra rounded-xtra mt-8 sm:mt-0 lg:pl-20">
                <p className="font-heading font-light text-xl md:leading-loose text-foreground">Explore a world of culinary creativity at your fingertips. Share your favorite recipes, discover dishes from food lovers around the globe, and connect over the meals that bring us together. Whether you&apos;re a seasoned chef or just starting your culinary journey, Platelette is your community for all things food.</p>
            </div>
            
        </section>
        </Card>
    )
}

export default Hero;