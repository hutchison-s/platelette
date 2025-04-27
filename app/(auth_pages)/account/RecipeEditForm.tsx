'use client'

import React, { FormEvent, useEffect, useRef, useState } from "react";
import { IngredientInput, InstructionInput, NumberInput, TextAreaInput, TextInput } from "../../_components/ui/Inputs";
import PhotoInputWithPreview from "../../_components/ui/PhotoInput";
import { Button } from "../../_components/ui/Buttons";
import { getS3UploadUrl, titleToSlug } from "../../_utils/helpers";
import { MeasurementUnit, Recipe } from "../../types";
import { useAuth } from "../../_hooks/useAuth";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader } from "lucide-react";
import { useApiController } from "../../_hooks/useApiController";
import InputList from "../create/InputList";


function RecipeEditForm() {
  const {user} = useAuth();
  const {Recipes} = useApiController();
  const router = useRouter();
  const [isSubmitting, setIsSubmiting] = useState(false)
  const formRef = useRef<HTMLFormElement>(null);
  const searchParams = useSearchParams();
  const [recipe, setRecipe] = useState<Recipe>();

  useEffect(()=>{
    console.log('searchParams', searchParams.get('id'))
    Recipes().getOne(searchParams.get('id') || '')
      .then(res => {
        if (!res) {
            throw new Error("Recipe not found");
        }
        setRecipe(res);
      }).catch(err => {
        console.error(err);
      })
  }, [searchParams, Recipes])

    useEffect(() => {
    if (recipe && formRef.current) {
      const form = formRef.current;
      console.log('recipe', recipe, 'form', form)
        if (form) {
            (form.querySelector('input[name="title"]') as HTMLInputElement).value = recipe.title || '';
            form.description.value = recipe.description || '';
            form.tags.value = recipe.tags?.join(', ') || '';
            form.yield.value = recipe.yield?.toString() || '';
            if (recipe.photo) {
                const photoInput = document.getElementById('photo') as HTMLInputElement;
                photoInput.dataset.previewSrc = recipe.photo;
            }
            if (recipe.ingredients) {
                const ingredientInputs = form.querySelectorAll('.ingredient-input');
                recipe.ingredients.forEach((ing, idx) => {
                if (ingredientInputs[idx]) {
                    (ingredientInputs[idx] as HTMLInputElement).value = ing.name || '';
                    const qtyInput = form.querySelector(`input[name="qty-${idx}"]`) as HTMLInputElement;
                    const measureInput = form.querySelector(`select[name="measure-${idx}"]`) as HTMLSelectElement;
                    if (qtyInput) qtyInput.value = ing.qty?.toString() || '';
                    if (measureInput) measureInput.value = ing.measure || '';
                }
                });
            }
            if (recipe.instructions) {
                const instructionInputs = form.querySelectorAll('.instruction-input');
                recipe.instructions.forEach((step, idx) => {
                if (instructionInputs[idx]) {
                    (instructionInputs[idx] as HTMLInputElement).value = step || '';
                }
                });
            }
            }
    }
  }, [recipe])

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        setIsSubmiting(true);
        e.preventDefault();
        if (!user || !recipe) return;
        const fd = new FormData(e.currentTarget);
        let photoURL = recipe.photo || '';
        const photoEl = document.getElementById('photo') as HTMLInputElement;
        const {files} = photoEl;
        if (files && files.length > 0) {
            const photo = files[0];
            photoURL = `https://platelette-images.s3.us-east-1.amazonaws.com/${recipe.id}`;
            const uploadURL = await getS3UploadUrl(photo.type, photo.size, recipe.id);
            if (!uploadURL) return;
            console.log('url', uploadURL)
            await fetch(uploadURL, {method: 'PUT', body: photo}).catch(err => console.log(err));
        }
        const title = fd.get('title') as string;
        const description = fd.get('description') as string;
        const tags = (fd.get('tags') as string).split(',').map(each => each.replace(/\s/g, ''));
        const y = parseInt(fd.get('yield') as string)
        const slug = titleToSlug(title);

        

        const updatedRecipe: Recipe = { 
          ...recipe,
          photo: photoURL,
          yield: y, 
          tags, 
          title, 
          slug, 
          description, 
          ingredients: [], 
          instructions: []
        }

        for (const k of fd.keys()) {
          const thisKey = fd.get(k) as string;
          const split = k.split('-')
          const idx = parseInt(split.length > 1 ? split[1] : '');

          if (k.startsWith('step')) {
            updatedRecipe.instructions!.push(thisKey)
          }
          if (k.startsWith('qty')) {
            updatedRecipe.ingredients![idx] = {...updatedRecipe.ingredients![idx], qty: parseInt(thisKey) }
          }
          if (k.startsWith('measure')) {
            updatedRecipe.ingredients![idx] = {...updatedRecipe.ingredients![idx], measure: thisKey as MeasurementUnit }
          }
          if (k.startsWith('ingredient_name')) {
            updatedRecipe.ingredients![idx] = {...updatedRecipe.ingredients![idx], name: thisKey }
          }
        }
        await Recipes().update(updatedRecipe, '/'+recipe.id)
          .then(res => {
            if (!res || !res.ok) {
              throw new Error("Error editing recipe")
            }
            setIsSubmiting(false)
            router.push('/account');
          }).catch(err => console.log(err));
    }
  return (
    recipe
        ? 
        <>
    
      <form className="w-full flex flex-col gap-2 py-6 relative" ref={formRef} onSubmit={handleSubmit}>

        <>
          <p className="font-heading text-xl mt-2 border-b-2 border-b-primary w-full max-w-600 mx-auto">General Info</p>
          <TextInput label="Recipe Title" name="title" className="w-full mx-auto max-w-600" />
          <TextAreaInput label="Description" name="description" className="w-full mx-auto max-w-600" textAreaClassName="resize-none" rest={{rows: 5}}/>
          <PhotoInputWithPreview name="photo" className="w-full mx-auto max-w-600" initial={recipe.photo}/>
          <TextInput label="Tags (separated by commas )" name="tags" className="w-full mx-auto max-w-600" />

          <p className="font-heading text-xl mt-2 border-b-2 border-b-primary w-full max-w-600 mx-auto">Ingredients</p>
          <InputList label="Ingredient" Component={IngredientInput} className="w-full mx-auto max-w-600" initial={recipe?.ingredients.map((ing, idx) => <IngredientInput key={idx} index={idx} defaultValue={ing}/>)}/>

          <p className="font-heading text-xl mt-2 border-b-2 border-b-primary w-full max-w-600 mx-auto">Instructions</p>
          <InputList label="Step" Component={InstructionInput} className="w-full mx-auto max-w-600"  initial={recipe?.instructions.map((step, idx)=><InstructionInput key={idx} index={idx} defaultValue={step} />)}/>

          <NumberInput label="Yield" name="yield" className="w-fit mx-auto"/>

          <Button className="block mx-auto my-4 mt-8">Update Recipe</Button>
        </>
        {isSubmitting && <div className="absolute inset-0 bg-white/50 grid place-items-center z-20 backdrop-blur-xl rounded-xl"><Loader size={80} className="text-primary animate-spin"/></div>}
      </form>
      
    </>
    :
    <Loader size={80} className="text-primary animate-spin mx-auto my-20" />
  );
}

export default RecipeEditForm;