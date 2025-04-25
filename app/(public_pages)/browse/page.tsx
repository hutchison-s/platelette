import { Metadata } from 'next'
import React from 'react'
import RecipePaginator from './RecipePaginator'

export const metadata: Metadata = {
  title: 'Browse Recipes',
  description: 'Browse recipes on Platelette'
}

function BrowseRecipesPage() {
  return (
    <>
        <RecipePaginator />
    </>
  )
}

export default BrowseRecipesPage