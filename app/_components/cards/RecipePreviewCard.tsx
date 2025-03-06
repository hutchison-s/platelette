import Link from "next/link";
import Card from "./Card";
import { RecipePreview } from "@/app/types";
import UserPhoto from "../ui/UserPhoto";
import DateString from "../ui/DateString";


function RecipePreviewCard({recipe, className=''}: {recipe: RecipePreview, className?: string}) {
    return (
        <Card className={"grid gap-2 "+className}>
            <Link href={`/recipes/${recipe.slug}`}>
                <img src={recipe.photo} alt='Recipe photo' width={200} className="w-full h-32 object-cover rounded-std md:h-60"/>
            </Link>
            <div className="w-full flex gap-2 justify-between items-center">
                <h3 className="shrink font-heading font-bold text-foreground text-xl md:text-2xl"><Link href={`/recipes/${recipe.slug}`}>{recipe.title}</Link></h3>
                <div className="shrink-0 bg-background2 border-1 border-background2 outline outline-[1px] outline-primary rounded-full size-8 overflow-hidden md:size-12">
                    <UserPhoto url={recipe.author.photo} name={recipe.author.name}/>
                </div>
            </div>
            <p className="font-body font-light text-foreground text-sm md:text-md" >{recipe.description}</p>
            <div className="text-primary2 text-sm font-light font-body flex gap-2">
                {recipe.tags?.map((tag, idx) => {
                    return (
                        <span key={idx}>
                            {idx !== 0 && '  |  '}
                            <Link href={`/search?query=${tag}`}>{tag}</Link>
                        </span>
                        
                    )
                })}
            </div>
            <p className="text-right text-faded text-xs">{recipe.author.name} - <DateString time={recipe.created} /></p>
        </Card>
    )
}
export default RecipePreviewCard;