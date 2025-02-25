'use client'
// import { v4 as uuidv4 } from "uuid";
// import unorm from "unorm";
import Card from "../_components/cards/Card";
// import { ButtonStyles } from "../_components/ui/Buttons";
// import { useRef } from "react";
import SectionHeading from "../_components/ui/SectionHeading";
import RecipeForm from "./RecipeForm";

// const titleToSlug = (title: string) =>
//     unorm.nfd(title)
//       .replace(/[\u0300-\u036f]/g, '')
//       .toLowerCase()
//       .replace(/[^a-z0-9\s-]/g, '')
//       .replace(/\s+/g, '-')
//       .replace(/-+/g, '-') 
//       .trim();

function CreatePage() {
    // const inputRef = useRef<HTMLTextAreaElement>(null)
    // const credRef = useRef<HTMLInputElement>(null)

    // const handleSend = ()=>{
    //     const input = inputRef.current?.value || '';
    //     const inputObject = JSON.parse(input);
    //     const newRecipe = {
    //         id: uuidv4(),
    //         ...inputObject,
    //         slug: titleToSlug(inputObject.title)
    //     }
    //     fetch('https://api.platelette.com/recipes', {method: 'POST', headers: {"Content-Type": "application/json"}, body: JSON.stringify(newRecipe)})
    //     .then(res => {
    //         if (res.ok) {
    //             console.log('recipe added')
    //         }
    //     })
    //     .catch(err => {
    //         console.error(err);
            
    //     }) 
    // }


  return (
    <div>
        <SectionHeading className="max-w-800 mx-auto">New Recipe</SectionHeading>
        <Card className="grid place-items-center max-w-800 mx-auto">
            <RecipeForm />

            {/* <div className="w-full max-w-[600px]">
                <label htmlFor="json" className="block">Enter or paste JSON for new recipe below</label>
                <textarea ref={inputRef} name="json" id="json" className="border-1 border-foreground p-2 rounded-std w-full my-2" >
                </textarea>
                <label htmlFor="creds" className="block">Enter CreatorCode</label>
                <input ref={credRef} type="text" name="creds" id="creds" placeholder="CreatorCode..." className="border-1 border-foreground p-2 rounded-std w-full my-2"/>
                <button onClick={handleSend} className={ButtonStyles.primary+" mx-auto block mt-2"}>Send New Recipe</button>
            </div> */}
        </Card>
    </div>
  )
}

export default CreatePage