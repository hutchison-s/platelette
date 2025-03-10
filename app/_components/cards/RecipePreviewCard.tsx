import Link from "next/link";
import Card from "./Card";
import { RecipePreview } from "@/app/types";
import UserPhoto from "../ui/UserPhoto";
import DateString from "../ui/DateString";
import { AlertCircle } from "lucide-react";


function RecipePreviewCard({recipe, className=''}: {recipe: RecipePreview, className?: string}) {

    function TagLinks({tags}: {tags: string[]}) {
        return (
            <div className="text-primary2 text-sm font-light font-body flex gap-2">
                {tags?.map((tag, idx) => {
                    return (
                        <span key={idx}>
                            {idx !== 0 && '  |  '}
                            <Link href={`/search?query=${tag}`}>{tag}</Link>
                        </span>
                        
                    )
                })}
            </div>
        )
    }

    function TruncatedDescription({description}: {description: string}) {
        const maxLength = 140;
        if (description.length <= maxLength) {
            return <p className="font-body font-light text-foreground text-sm md:text-md" >{description}</p>
        }
        const truncated = description.slice(0, maxLength) + '...';
        return <p className="font-body font-light text-foreground text-sm md:text-md" >{truncated}</p>
    }

    if (!recipe) {
        return <Card className={"grid place-items-center "+className}><AlertCircle size={60} className="text-primary2"/></Card>
    }

    return (
        <Card className={"grid gap-2 "+className}>
            <Link href={`/recipes/${recipe.slug}`}>
                <img src={recipe.photo} alt='Recipe photo' width={200} className="w-full h-32 object-cover rounded-std md:h-60"/>
            </Link>
            <div className="w-full flex gap-2 justify-between items-center">
                <h3 className="shrink font-heading font-bold text-foreground text-xl md:text-2xl"><Link href={`/recipes/${recipe.slug}`}>{recipe.title}</Link></h3>
                <Link href={`/browse/members?member=${recipe.author_sub}`} className="shrink-0 bg-background2 border-1 border-background2 outline outline-[1px] outline-primary rounded-full size-8 overflow-hidden md:size-12">
                    <UserPhoto url={recipe.author_photo} name={recipe.author_name}/>
                </Link>
            </div>
            <TruncatedDescription description={recipe.description}/>
            <TagLinks tags={recipe.tags || []}/>
            <p className="text-right text-faded text-xs">{recipe.author_name} - <DateString time={recipe.created} /></p>
        </Card>
    )
}
export default RecipePreviewCard;