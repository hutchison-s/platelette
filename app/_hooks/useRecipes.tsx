'use client'

import React, { createContext, useContext, useEffect, useState } from "react"
import { v4 as uuidv4 } from "uuid";
import { fetchStatus, Recipe } from "../types"
import useFetch from "./useFetch";
import { titleToSlug } from "../_utils/helpers";

type recipeContextType = {recipes: Recipe[], status: fetchStatus, addRecipe: (input: Partial<Recipe>, credentials: string)=>void}

const initialContext: recipeContextType = {recipes: [], status: 'loading', addRecipe: (input: Partial<Recipe>, credentials: string)=>{console.log(input, credentials)}}

const recipeContext = createContext<recipeContextType>(initialContext);

export function RecipeProvider ({children}: {children: React.ReactNode}) {
    const [data, status] = useFetch<Recipe[]>('https://api.platelette.com/recipes');
    const [recipes, setRecipes] = useState<Recipe[]>([]);

    useEffect(()=>{
        if (status == 'success' && data) {
            setRecipes(data)
        }
    }, [data, status])

    const addRecipe = async (input: Partial<Recipe>, credentials: string) => {
        try {
            const id = uuidv4();
            const result = await fetch('https://api.platelette.com/recipes',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${credentials}`
                },
                body: JSON.stringify({
                    id,
                    slug: titleToSlug(input.title || 'recipe'),
                    ...input
                })
            })
            if (!result.ok) throw new Error(result.statusText);
            const returned = await result.json();
            setRecipes(prev => [...prev, returned]);
        } catch (error) {
            console.error('Post recipe error', error);
        }
        return;
    }

    return (
        <recipeContext.Provider value={{recipes, status, addRecipe}}>
            {children}
        </recipeContext.Provider>
    )
}

export const useRecipes = ()=>useContext(recipeContext)