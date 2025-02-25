'use client'

import React, { FormEvent } from "react";
import { IngredientInput, InstructionInput, TextAreaInput, TextInput } from "../_components/ui/Inputs";
import InputList from "./InputList";
import PhotoInputWithPreview from "../_components/ui/PhotoInput";
import { Button } from "../_components/ui/Buttons";


function RecipeForm() {
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        const photoEl = document.getElementById('photo') as HTMLInputElement;
        const {files} = photoEl;
        fd.append('photo', files![0])
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
