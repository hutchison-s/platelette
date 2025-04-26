"use client"

import { Heart, Pencil, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import Card from "../../_components/cards/Card";
import { useApiController } from "../../_hooks/useApiController";
import { Recipe } from "../../types";
import Link from "next/link";
import TagLinks from "../../_components/cards/TagLinks";

export default function SmallRecipeCard({r}: {r: Recipe}) {
    const {Recipes} = useApiController();
    const router = useRouter();
    
    const handleDelete = async ()=>{
        const isConfirmed = confirm('Are you sure you want to delete this recipe?')
        if (isConfirmed) {
            await Recipes().deleteOne(r.id);
            r.title = 'Deleted'
            setTimeout(router.refresh, 300)
        }
        
    }
    
    return (
        <Card className='flex gap-2 justify-between bg-background2 p-std rounded-xtra min-h-28 h-28'>
            <div className="flex flex-col justify-between">
                <div className='flex gap-2'>
                    <div className="aspect-[3/2] overflow-hidden w-24 rounded-std object-cover"><img src={r.photo} alt='Recipe photo' width={20} className='w-full '/></div>
                    <div className="grid items-center">
                        <Link href={`/recipes/${r.slug}`} className='font-heading font-bold text-md truncate md:text-2xl hover:text-blue-600'>{r.title}</Link>
                        <div className='flex gap-6 text-lg'>
                            <div className="flex gap-2 items-center">
                                <Heart />
                                <span>{r.likes}</span>
                            </div>
                            {/* <div className="flex gap-2 items-center">
                                <Sparkle />
                                <span>0</span>
                            </div> */}
                        </div>
                    </div>
                    
                </div>
                <TagLinks tags={r.tags || []} />
            </div>
            <div className='rounded-std flex gap-1 flex-col justify-evenly'>
                <button disabled className="size-full px-2 md:px-4 grid place-items-center disabled:cursor-not-allowed disabled:grayscale disabled:opacity-30 border-1 border-blue-600 text-blue-600 rounded-std hover:bg-blue-600 hover:text-background2">
                    <Pencil />
                </button>
                <button 
                    onClick={handleDelete}
                    className="size-full px-2 md:px-4 grid place-items-center border-1 border-primary text-primary rounded-std hover:bg-primary hover:text-background2 disabled:cursor-not-allowed disabled:grayscale disabled:opacity-30">
                    <Trash />
                </button>
            </div>
        </Card>
    )
}