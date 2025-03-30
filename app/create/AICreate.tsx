'use client'

import React, { FormEventHandler, useRef, useState } from 'react'
import { Recipe } from '../types'
import { TextInput } from '../_components/ui/Inputs';
import { useAuth } from '../_hooks/useAuth';
import { ButtonStyles } from '../_components/ui/Buttons';
import Card from '../_components/cards/Card';
import { Loader, Share2, Split } from 'lucide-react';
import { useApiController } from '../_hooks/useApiController';
import { v4 as uuidv4 } from 'uuid';
import { getS3UploadUrl, titleToSlug } from '../_utils/helpers';
import { useRouter } from 'next/navigation';

function GenerateSkeleton() {
    return (
        <section className='grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-2'>
            <div className="grid gap-2">
                <Card className='p-2'>
                <p className='w-full h-8 bg-stone-400 animate-pulse mb-4 rounded'></p>
                    <div className='w-full aspect-[16/9] max-w-600 mx-auto bg-stone-400 animate-pulse'></div>
                </Card>
                <Card className='p-2 grid gap-1'>
                    <p className='w-1/2 h-8 bg-stone-400 animate-pulse mb-4 rounded'></p>
                    <p className="w-full bg-stone-400 animate-pulse rounded h-3"></p>
                    <p className="w-full bg-stone-400 animate-pulse rounded h-3"></p>
                    <p className="w-full bg-stone-400 animate-pulse rounded h-3"></p>
                    <p className="w-full bg-stone-400 animate-pulse rounded h-3"></p>

                </Card>
            </div>
            <Card className='p-2 grid gap-1'>
                    <p className='w-1/2 h-8 bg-stone-400 animate-pulse mb-4 rounded'></p>
                    <p className="w-full bg-stone-400 animate-pulse rounded h-3"></p>
                    <p className="w-full bg-stone-400 animate-pulse rounded h-3"></p>
                    <p className="w-full bg-stone-400 animate-pulse rounded h-3"></p>
                    <p className="w-full bg-stone-400 animate-pulse rounded h-3"></p>

                </Card>
        </section>
    )
}

function GenerateRecipe({r, photo, modify, save}: {r: Partial<Recipe>, photo?: string, modify: FormEventHandler<HTMLFormElement>, save: ()=>void}) {
    if (!r) return null;
    return (
        <section className='grid grid-cols-1 md:grid-rows-2 md:grid-cols-[3fr_2fr] gap-2'>
            <Card className='px-2 order-1 md:col-start-1 md:row-start-1'>
                <p className='font-heading font-black text-foreground text-3xl py-2'>{r.title}</p>
                <p className='font-body py-2'>{r.yield} Servings</p>
                    {photo 
                        ? <img src={photo} alt={r.title} width={'100%'} className='w-full aspect-[16/9] rounded-std mx-auto object-cover'/> 
                        : <div className='w-full aspect-[16/9] max-w-600 mx-auto bg-stone-400 animate-pulse'></div>}
            </Card>
            <Card className='px-2 order-3 grid gap-1 md:col-start-1 md:row-start-2'>
                <p className='font-body font-bold text-secondary text-2xl'>Instructions</p>
                <ol className='leading-loose ml-4 list-decimal px-4'>
                    {r.instructions?.map((m, idx) => <li key={idx} className='py-1'>{m}</li>)}
                </ol>

            </Card>
            <Card className='p-2 flex flex-col justify-between order-2 md:col-start-2 md:row-start-1 md:row-span-2'>
                    
                    <div>
                        <p className='font-body font-bold text-secondary text-2xl mb-4'>Ingredients</p>
                        <ul className='list-disc leading-loose ml-4 px-4'>
                            {r.ingredients?.map((ing, idx) => <li key={idx} className='py-1'>{ing.qty} {ing.measure}{ing.qty > 1 && 's'} {ing.name}</li>)}
                        </ul>
                    </div>
                    <div className="w-full px-2 py-4 gap-2">
                        <button onClick={save} className={ButtonStyles.primary+' mx-auto flex gap-2 justify-center mb-8'}><Share2 /> Share Your Creation!</button>
                        <form onSubmit={modify}>
                            <p className='font-bold text-2xl mb-2'>Modify recipe:</p>
                            <div className="flex gap-2 w-full">
                                <TextInput label='Make it' name='modification' className='w-full'/>
                                <button type="submit" className={ButtonStyles.hollow}><Split /></button>
                            </div>
                        </form>
                    </div>

                </Card>
        </section>
    )
}

function AICreate() {
    const [generated, setGenerated] = useState<Partial<Recipe>>({})
    const [isLoading, setIsLoading] = useState(false);
    const [photo, setPhoto] = useState('')
    const {access, user} = useAuth();
    const {Recipes} = useApiController();
    const router = useRouter();
    const saveRef = useRef<HTMLDialogElement>(null);

    const handleSubmit: FormEventHandler<HTMLFormElement> = async (e)=>{
        e.preventDefault();
        setIsLoading(true);
        setGenerated({})
        URL.revokeObjectURL(photo);
        setPhoto('')
        const target = e.currentTarget as HTMLFormElement;
        const prompt = target.prompt?.value;
        if (!prompt) return;
        await fetch('https://api.platelette.com/ai', {method: 'POST', headers: {'Authorization': `Bearer ${access}`, 'Content-Type': 'application/json', 'Accept': 'application/json'}, body: JSON.stringify({prompt})})
            .then(res => res.json())
            .then(json => {
                setGenerated({...json.recipe});
                
            })
            .catch(err => console.log(err))
            .finally(()=>setIsLoading(false))
        await fetch('https://api.platelette.com/ai/photo', {method: 'POST', headers: {'Authorization': `Bearer ${access}`, 'Content-Type': 'application/json', 'Accept': 'application/json'}, body: JSON.stringify({prompt})})
        .then(res => res.json())
        .then(json => {
            const blob = base64ToBlob(json.image);
            const url = URL.createObjectURL(blob);
            setPhoto(url)
        })
        .catch(err => console.log(err))
        target.reset();
    }

    const handleMod: FormEventHandler<HTMLFormElement> = async (e)=>{
        e.preventDefault();
        setIsLoading(true);
        setGenerated({});
        URL.revokeObjectURL(photo);
        setPhoto('');
        let newTitle;
        const target = e.currentTarget as HTMLFormElement;
        const mod = target.modification?.value;
        if (!mod) return;
        const prompt = `Make this recipe ${mod}`;
        await fetch('https://api.platelette.com/ai/mod', {method: 'POST', headers: {'Authorization': `Bearer ${access}`, 'Content-Type': 'application/json', 'Accept': 'application/json'}, body: JSON.stringify({prompt, recipe: generated})})
            .then(res => res.json())
            .then(json => {
                setGenerated({...json.recipe});
                newTitle = json.recipe.title;
            })
            .catch(err => console.log(err))
            .finally(()=>setIsLoading(false))
        await fetch('https://api.platelette.com/ai/photo', {method: 'POST', headers: {'Authorization': `Bearer ${access}`, 'Content-Type': 'application/json', 'Accept': 'application/json'}, body: JSON.stringify({prompt: newTitle})})
        .then(res => res.json())
        .then(json => {
            const blob = base64ToBlob(json.image);
            const url = URL.createObjectURL(blob);
            setPhoto(url)
        })
        .catch(err => console.log(err))
        target.reset();
    }

    const saveRecipe = async ()=>{
        saveRef.current?.showModal();
        const blob = await urlToBlob(photo);
        console.log(blob);
        const id = uuidv4();
        const photoURL = 'https://platelette-images.s3.us-east-1.amazonaws.com/'+id || ''
        const uploadURL = await getS3UploadUrl(blob.type, blob.size, id);
        const slug = titleToSlug(generated.title || 'New Recipe')
        if (!uploadURL) return;
        await fetch(uploadURL, {method: 'PUT', body: blob}).catch(err => console.log(err));
        await Recipes().create({
            ...generated,
            id: uuidv4(),
            photo: photoURL,
            slug: slug,
            author_name: user!.name,
            author_photo: user!.photo,
            author_sub: user!.sub,
            tags: ['AI Generated']
        })
        router.push('/account')
    }

  return (
    <>
        <dialog ref={saveRef} className='w-full h-full backdrop-blur-lg bg-white/50'>
            <div className='w-full h-full grid place-items-center'>
                <Loader size={120} className='text-primary animate-spin'/>
            </div>
        </dialog>
        <div className={`${!generated.title && !isLoading ? 'h-[30vh]' : 'h-0'}`}></div>
        <form onSubmit={handleSubmit} className='w-full flex justify-center flex-col gap-2 items-center md:flex-row my-4 mx-auto '>
            <TextInput label='I want a recipe for...' name='prompt' className='w-full max-w-600'/>
            <button className={ButtonStyles.primary+' block'}>Generate</button>
        </form>
        {generated.title && <GenerateRecipe r={generated} photo={photo} modify={handleMod} save={saveRecipe}/>}
        {isLoading && <GenerateSkeleton />}
    </>
    
  )
}

function base64ToBlob(base64: string, mimeType = "image/png") {
    const byteCharacters = atob(base64); // Decode base64 string
    const byteNumbers = new Array(byteCharacters.length);
    
    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: mimeType });
}

async function urlToBlob(url: string) {
    return await fetch(url).then(res => res.blob())
}

export default AICreate