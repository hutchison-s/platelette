'use client'

import React, { FormEvent } from "react";
import { IngredientInput, InstructionInput, TextAreaInput, TextInput } from "../_components/ui/Inputs";
import InputList from "./InputList";
import PhotoInputWithPreview from "../_components/ui/PhotoInput";
import { Button } from "../_components/ui/Buttons";
import { getS3UploadUrl, titleToSlug } from "../_utils/helpers";
import { MeasurementUnit, Recipe } from "../types";
import { v4 as uuidV4 } from "uuid";


function RecipeForm() {
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        const photoEl = document.getElementById('photo') as HTMLInputElement;
        const {files} = photoEl;
        const photo = files![0];
        const id = uuidV4()
        const uploadURL = await getS3UploadUrl(photo.type, photo.size, id);
        if (!uploadURL) return;
        console.log('url', uploadURL)
        await fetch(uploadURL, {method: 'PUT', body: photo}).catch(err => console.log(err));

        const newRecipe: Partial<Recipe> = {
          id,
          title: fd.get('title') as string,
          slug: titleToSlug(fd.get('title') as string),
          description: fd.get('description') as string,
          photo: 'https://platelette-images.s3.us-east-1.amazonaws.com/'+id || '',
          ingredients: [],
          instructions: [],
          author: {
            name: 'John Smith',
            photo: 'https://randomuser.me/api/portraits/men/59.jpg'
          }
        }

        for (const k of fd.keys()) {
          if (k.includes('step')) {
            newRecipe.instructions!.push(fd.get(k) as string)
          }
          if (k.includes('qty')) {
            const idx = parseInt(k.split('-')[1]);
            newRecipe.ingredients![idx] = {...newRecipe.ingredients![idx], qty: parseInt(fd.get(k) as string) }
          }
          if (k.includes('measure')) {
            const idx = parseInt(k.split('-')[1]);
            newRecipe.ingredients![idx] = {...newRecipe.ingredients![idx], measure: fd.get(k) as MeasurementUnit }
          }
          if (k.includes('ingredient_name')) {
            const idx = parseInt(k.split('-')[1]);
            newRecipe.ingredients![idx] = {...newRecipe.ingredients![idx], name: fd.get(k) as string }
          }
        }

        const uploadReponse = await fetch('https://api.platelette.com/recipes', {
          method: "POST",
          headers: {"Content-Type": "application/json", "Authorization": "Bearer pEtCa21n7f5NcAUq"}, // REMOVE BEFORE COMMIT
          body: JSON.stringify(newRecipe)
        }).then(res => res.json()).catch(err => console.log(err));
        console.log(uploadReponse)
    }
  return (
    <>
      <form className="w-full flex flex-col gap-2 py-6" onSubmit={handleSubmit}>

        <p className="font-heading text-xl mt-2 border-b-2 border-b-primary w-full max-w-600 mx-auto">General Info</p>
        <TextInput label="Recipe Title" name="title" className="w-full mx-auto max-w-600" />
        <TextAreaInput label="Description" name="description" className="w-full mx-auto max-w-600" textAreaClassName="resize-none" rest={{rows: 5}}/>
        <PhotoInputWithPreview name="photo" className="w-full mx-auto max-w-600"/>

        <p className="font-heading text-xl mt-2 border-b-2 border-b-primary w-full max-w-600 mx-auto">Ingredients</p>
        <InputList label="Ingredient" Component={IngredientInput} className="w-full mx-auto max-w-600"/>

        <p className="font-heading text-xl mt-2 border-b-2 border-b-primary w-full max-w-600 mx-auto">Instructions</p>
        <InputList label="Step" Component={InstructionInput} className="w-full mx-auto max-w-600" />

        <Button className="block mx-auto my-4 mt-8">Submit Recipe</Button>
      </form>
    </>
  );
}

export default RecipeForm;
