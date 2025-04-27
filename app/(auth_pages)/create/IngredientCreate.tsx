'use client'

import { ButtonStyles } from '@/app/_components/ui/Buttons'
import { TextInput } from '@/app/_components/ui/Inputs'
import SelectInput from '@/app/_components/ui/SelectInput'
import { FeaturedText } from '@/app/_components/ui/Text'
import { useAuth } from '@/app/_hooks/useAuth'
import { Loader } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { FormEvent, useState } from 'react'

function IngredientCreate() {

    const [titles, setTitles] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const {access} = useAuth();
    const router = useRouter();

    const brainstorm = async (e: FormEvent<HTMLFormElement>) => {
        setIsLoading(true);
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const includers = formData.get('includers') as string;
        const restraint = formData.get('restraint') as string;
        const recipeType = formData.get('recipeType') as string || 'main';
        if (!includers) {
            alert('Please enter at least one ingredient.');
            return;
        }
        const response = await fetch('https://api.platelette.com/ai/brainstorm', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access}`,
            },
            body: JSON.stringify({
                includers: includers.trim(),
                restraint: restraint || '',
                recipeType: recipeType,
                maxTitles: 6,
            })
        });
        if (!response.ok) {
            const error = await response.json();
            setError(error.message || 'An error occurred while brainstorming recipe ideas.');
            setIsLoading(false);
            console.error('Error:', error);
            return;
        }
        const data = await response.json();
        if (data.titles && Array.isArray(data.titles)) {
            setTitles(data.titles);
            setError(null);
        }
        else {
            setError('Unexpected response format. Please try again.');
        }
        setIsLoading(false);

    }

    const createWithAI = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const title = e.currentTarget.textContent;
        if (!title) return;
        router.push(`/create?method=AI&title=${encodeURIComponent(title)}`);
    }
  return (
    <>

            <form onSubmit={brainstorm} className='w-full max-w-[600px] mx-auto flex flex-col gap-2 p-4'>
            <p className="font-heading text-xl mt-2 border-b-2 border-b-primary w-full max-w-600 mx-auto">List 1-3 ingredients to include:</p>
                <p className='italic'><small>eg. Chicken Breast, Mint</small></p>
                <TextInput
                    label="Ingredients to include"
                    name="includers"
                    className='w-full'
                    rest={{
                        required: true,
                        disabled: isLoading,
                    }}
                />
                <p className="font-heading text-xl mt-2 border-b-2 border-b-primary w-full max-w-600 mx-auto">Choose a type of recipe:</p>
                <div className="flex gap-2 py-2">
                    
                        <label htmlFor="appetizer" className="cursor-pointer has-[:checked]:bg-primary has-[:checked]:text-background2 px-4 py-2 rounded-md bg-background2 text-foreground">Appetizer <input type="radio" name="recipeType" value="appetizer" id="appetizer" className="hidden" /></label>

                        <label htmlFor="dessert" className="cursor-pointer has-[:checked]:bg-primary has-[:checked]:text-background2 px-4 py-2 rounded-md bg-background2 text-foreground">Dessert <input type="radio" name="recipeType" value="dessert" id="dessert" className="hidden" /></label>

                        <label htmlFor="main" className="cursor-pointer has-[:checked]:bg-primary has-[:checked]:text-background2 px-4 py-2 rounded-md bg-background2 text-foreground">Main Course <input type="radio" name="recipeType" value="main" id="main" className="hidden" defaultChecked/></label>

                        <label htmlFor="side" className="cursor-pointer has-[:checked]:bg-primary has-[:checked]:text-background2 px-4 py-2 rounded-md bg-background2 text-foreground">Side Dish <input type="radio" name="recipeType" value="side" id="side" className="hidden" /></label>

                        <label htmlFor="drink" className="cursor-pointer has-[:checked]:bg-primary has-[:checked]:text-background2 px-4 py-2 rounded-md bg-background2 text-foreground">Drink <input type="radio" name="recipeType" value="drink" id="drink" className="hidden" /></label>
                </div>
                <p className="font-heading text-xl mt-2 border-b-2 border-b-primary w-full max-w-600 mx-auto">Choose a restraint: <span className='font-light italic text-sm'>(Optional)</span></p>
                <p className="italic"><small>eg. Gluten-free, koscher</small></p>
                <SelectInput label='Restraint' name='restraint' rest={{defaultValue: ''}} options={[
                    {label: 'None', value: ''},
                    {label: 'Gluten-free', value: 'gluten-free'},
                    {label: 'Vegetarian', value: 'vegetarian'},
                    {label: 'Vegan', value: 'vegan'},
                    {label: 'Kosher', value: 'kosher'},
                    {label: 'Halal', value: 'halal'},
                    {label: 'Low-carb', value: 'low-carb'},
                    {label: 'Paleo', value: 'paleo'},
                    {label: 'Keto', value: 'keto'},
                    {label: 'Dairy-free', value: 'dairy-free'},
                    {label: 'Nut-free', value: 'nut-free'},
                    {label: 'Low-sodium', value: 'low-sodium'},
                    {label: 'Low-fat', value: 'low-fat'},
                    {label: 'High-protein', value: 'high-protein'},
                    {label: 'Low-calorie', value: 'low-calorie'},                    
                ]}/>
                <button className={ButtonStyles.primary+' block mx-auto mt-2'}>Get ideas</button>
            </form>
  
        {titles.length > 0 && (
            <>
            <FeaturedText className='text-center mb-0 pb-0'>Choose a recipe below to create it with AI</FeaturedText>
               
                <ul className='p-2 grid gap-2'>
                    {titles.map((title, index) => (
                        <li key={index} className='mx-auto w-full rounded-full bg-background2 max-w-[500px]'>
                            <button className={ButtonStyles.hollow+' min-h-20 w-full text-wrap bg-background2 whitespace-break-spaces'}  onClick={(e)=>createWithAI(e)}>{title}</button>
                        </li>
                    ))}
                </ul>
            </>
        )}
        {isLoading && <Loader size={80} className='mx-auto my-6 animate-spin text-primary' />}
        {error && <p className='text-red-500'>{error}</p>}

    </>
  )
}

export default IngredientCreate