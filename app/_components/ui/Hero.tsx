import ActionButtons from "./ActionButtons";

function Hero() {
    return (
        <section className="absolute w-screen top-[60px] left-0 h-fit px-6 py-8 hero-bg box-border md:px-8 lg:flex lg:justify-center items-center bg-gradient-to-br from-background to-background2 lg:px-[8vw] lg:flex-wrap lg:gap-y-6 lg:gap-x-12">
            <div className="text-left text-[4rem] md:text-[6rem] leading-[4rem] md:leading-[6rem] font-sans font-black flex flex-col text-transparent bg-gradient-to-br from-secondary/80 to-secondary bg-clip-text drop-shadow-md lg:items-end lg:py-10 lg:w-fit lg:shrink">
                <span className="w-full text-left">DISCOVER</span>
                <span className="w-full text-left">SHARE</span>
                <span className="w-full text-left">SAVOR</span>
            </div>
            <p className="font-heading font-light text-xl md:leading-loose text-transparent bg-gradient-to-tl from-primary to-foreground bg-clip-text py-8 md:text-2xl lg:flex-1 lg:max-w-600 xl:text-3xl xl:leading-[3rem]">
                Explore a world of culinary creativity at your fingertips. Share your favorite recipes, discover dishes from food lovers around the globe, and connect over the meals that bring us together.</p>
            <div className="flex w-full justify-center flex-col sm:flex-row items-center gap-4 md:flex-full md:gap-10">
                <ActionButtons />
            </div>
        </section>
    )
}

export default Hero;