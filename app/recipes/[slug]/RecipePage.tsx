import Card from "@/app/_components/cards/Card";
import { Recipe } from "@/app/types";
import RecipeButtons from "./RecipeButtons";
import UserPhoto from "@/app/_components/ui/UserPhoto";
import Link from "next/link";
import { Heart } from "lucide-react";
import DateString from "@/app/_components/ui/DateString";


export default function RecipePage({recipe}: {recipe: Recipe}) {
    return (
        <>
            <h2 className="text-4xl my-6 pb-4 font-heading text-secondary border-b-4 border-primary print:hidden">Recipe Details</h2>
            <section className='grid grid-cols-1 md:grid-rows-2 md:grid-cols-[3fr_2fr] gap-2'>
            <Card className='px-2 order-1 md:col-start-1 md:row-start-1'>
                <div className="flex gap-2 justify-between items-center">
                    <p className='font-heading font-black text-foreground text-3xl py-2'>{recipe.title}</p>
                    <Link href={`/browse/members?member=${recipe.author_sub}`} className="shrink-0 bg-background2 border-1 border-background2 outline outline-[1px] outline-primary rounded-full size-8 overflow-hidden md:size-12">
                        <UserPhoto url={recipe.author_photo} name={recipe.author_name}/>
                    </Link>
                </div>
                <p className='font-body py-2'>{recipe.yield} Servings</p>
                    {recipe.photo 
                        ? <img src={recipe.photo} alt={recipe.title} width={'100%'} className='w-full aspect-[16/9] max-w-600 rounded-std mx-auto object-cover'/> 
                        : <div className='w-full aspect-[16/9] max-w-600 mx-auto bg-stone-400 animate-pulse'></div>}
                <div className="flex w-full justify-between mt-2">
                    <p className="flex gap-2 text-xs text-faded items-center">
                        <Heart size={16}/>
                        {recipe.likes}
                    </p>
                    <p className="text-right text-faded text-xs">{recipe.author_name} - <DateString time={recipe.created} /></p>
                </div>
            </Card>
            <Card className='px-2 order-3 flex flex-col gap-4 justify-start md:col-start-1 md:row-start-2'>
                <p className='font-body font-bold text-secondary text-2xl'>Instructions</p>
                <ol className='leading-loose ml-4 list-decimal px-4'>
                    {recipe.instructions?.map((m, idx) => <li key={idx} className='py-1'>{m}</li>)}
                </ol>

            </Card>
            <Card className='p-2 flex flex-col gap-4 justify-start order-2 md:col-start-2 md:row-start-1 md:row-span-2'>
                    <RecipeButtons recipe_id={recipe.id} />
                    <div>
                        <p className='font-body font-bold text-secondary text-2xl mb-4'>Ingredients</p>
                        <ul className='list-disc leading-loose ml-4 px-4'>
                            {recipe.ingredients?.map((ing, idx) => <li key={idx} className='py-1'>{ing.qty} {ing.measure} {ing.name}</li>)}
                        </ul>
                    </div>

                </Card>
        </section>
        </>
    )
}

