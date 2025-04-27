'use client'

import { Pencil } from "lucide-react"
import Link from "next/link"

function RecipeEdit({recipeId }: {recipeId: string}) {

  return (
    <>
    <Link
    href={`/edit-recipe?id=${recipeId}`} 
        className="size-full px-2 md:px-4 grid place-items-center disabled:cursor-not-allowed disabled:grayscale disabled:opacity-30 border-1 border-blue-600 text-blue-600 rounded-std hover:bg-blue-600 hover:text-background2">
        <Pencil />
    </Link>
      </>
  )
}

export default RecipeEdit