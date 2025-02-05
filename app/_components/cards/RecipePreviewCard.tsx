import Card from "./Card";

function RecipePreviewCard({recipe}: {recipe: {title: string, desc: string, photo: string, tags: string[], timestamp: string, user: {name: string, photo: string}}}) {
    return (
        <Card className="grid gap-2">
            <img src={recipe.photo} alt='Recipe photo' width={200} className="w-full h-32 object-cover rounded-std md:h-60"/>
            <div className="w-full flex gap-2 justify-between items-center">
                <h3 className="shrink font-heading font-bold text-foreground text-xl md:text-2xl">{recipe.title}</h3>
                <div className="shrink-0 bg-background2 border-1 border-background2 outline outline-[1px] outline-primary rounded-full size-8 overflow-hidden md:size-12">
                    <img src={recipe.user.photo} width={'100%'} className="object-cover"/>
                </div>
            </div>
            <p className="font-body font-light text-foreground text-sm md:text-md" >{recipe.desc}</p>
            <p className="text-primary2 text-sm font-light font-body">{recipe.tags.join('  |  ')}</p>
            <p className="text-right text-secondary/75 text-xs">{recipe.user.name} - {recipe.timestamp}</p>
        </Card>
    )
}
export default RecipePreviewCard;