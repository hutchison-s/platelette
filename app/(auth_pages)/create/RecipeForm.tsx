'use client'

import React, { FormEvent, useState } from "react";
import { IngredientInput, InstructionInput, NumberInput, TextAreaInput, TextInput } from "../../_components/ui/Inputs";
import InputList from "./InputList";
import PhotoInputWithPreview from "../../_components/ui/PhotoInput";
import { Button } from "../../_components/ui/Buttons";
import { getS3UploadUrl, titleToSlug } from "../../_utils/helpers";
import { MeasurementUnit, Recipe } from "../../types";
import { v4 as uuidV4 } from "uuid";
import { useAuth } from "../../_hooks/useAuth";
import { useRouter } from "next/navigation";
import { Loader } from "lucide-react";
import { useApiController } from "../../_hooks/useApiController";


function RecipeForm() {
  const {user} = useAuth();
  const {Recipes} = useApiController();
  const router = useRouter();
  const [isSubmitting, setIsSubmiting] = useState(false)
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        setIsSubmiting(true);
        e.preventDefault();
        if (!user) return;
        const fd = new FormData(e.currentTarget);
        const photoEl = document.getElementById('photo') as HTMLInputElement;
        const {files} = photoEl;
        const photo = files![0];
        const id = uuidV4();
        const photoURL = 'https://platelette-images.s3.us-east-1.amazonaws.com/'+id || ''
        const title = fd.get('title') as string;
        const description = fd.get('description') as string;
        const tags = (fd.get('tags') as string).split(',').map(each => each.replace(/\s/g, ''));
        const y = parseInt(fd.get('yield') as string)
        const slug = titleToSlug(title);
        const author_name = user.name;
        const author_photo = user.photo;
        const author_sub = user.sub;
        const uploadURL = await getS3UploadUrl(photo.type, photo.size, id);
        if (!uploadURL) return;
        console.log('url', uploadURL)
        await fetch(uploadURL, {method: 'PUT', body: photo}).catch(err => console.log(err));

        const newRecipe: Partial<Recipe> = { 
          id, 
          yield: y, 
          tags, 
          title, 
          slug, 
          description, 
          photo: photoURL, 
          ingredients: [], 
          instructions: [], 
          author_name,
          author_photo,
          author_sub 
        }

        for (const k of fd.keys()) {
          const thisKey = fd.get(k) as string;
          const split = k.split('-')
          const idx = parseInt(split.length > 1 ? split[1] : '');

          if (k.startsWith('step')) {
            newRecipe.instructions!.push(thisKey)
          }
          if (k.startsWith('qty')) {
            newRecipe.ingredients![idx] = {...newRecipe.ingredients![idx], qty: parseInt(thisKey) }
          }
          if (k.startsWith('measure')) {
            newRecipe.ingredients![idx] = {...newRecipe.ingredients![idx], measure: thisKey as MeasurementUnit }
          }
          if (k.startsWith('ingredient_name')) {
            newRecipe.ingredients![idx] = {...newRecipe.ingredients![idx], name: thisKey }
          }
        }
        await Recipes().create(newRecipe)
          .then(res => {
            if (!res || !res.ok) {
              throw new Error("Error creating recipe")
            }
            setIsSubmiting(false)
            router.push(`/recipes?name=${slug}`)
          }).catch(err => console.log(err));
    }
  return (
    <>
      <form className="w-full flex flex-col gap-2 py-6 relative" onSubmit={handleSubmit}>

        <>
          <p className="font-heading text-xl mt-2 border-b-2 border-b-primary w-full max-w-600 mx-auto">General Info</p>
          <TextInput label="Recipe Title" name="title" className="w-full mx-auto max-w-600" />
          <TextAreaInput label="Description" name="description" className="w-full mx-auto max-w-600" textAreaClassName="resize-none" rest={{rows: 5}}/>
          <PhotoInputWithPreview name="photo" className="w-full mx-auto max-w-600"/>
          <TextInput label="Tags (separated by commas )" name="tags" className="w-full mx-auto max-w-600" />

          <p className="font-heading text-xl mt-2 border-b-2 border-b-primary w-full max-w-600 mx-auto">Ingredients</p>
          <InputList label="Ingredient" Component={IngredientInput} className="w-full mx-auto max-w-600"/>

          <p className="font-heading text-xl mt-2 border-b-2 border-b-primary w-full max-w-600 mx-auto">Instructions</p>
          <InputList label="Step" Component={InstructionInput} className="w-full mx-auto max-w-600" />

          <NumberInput label="Yield" name="yield" className="w-fit mx-auto"/>

          <Button className="block mx-auto my-4 mt-8">Submit Recipe</Button>
        </>
        {isSubmitting && <div className="absolute inset-0 bg-white/50 grid place-items-center z-20 backdrop-blur-xl rounded-xl"><Loader size={80} className="text-primary animate-spin"/></div>}
      </form>
      
    </>
  );
}

export default RecipeForm;
