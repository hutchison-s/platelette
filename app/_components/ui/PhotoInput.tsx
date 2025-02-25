'use client'

import { RefreshCcw } from "lucide-react";
import { ChangeEvent, useEffect, useRef, useState } from "react";

function PhotoInputWithPreview({name, className}: {name: string, className?: string}) {
    const [url, setUrl] = useState<string | undefined>()
    const [file, setFile] = useState<File | undefined>()
    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(()=>{
        if (file) {
            const obj = URL.createObjectURL(file);
            setUrl(obj);
        } else {
            setUrl(undefined)
        }
    }, [file])

    const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
        const {files} = e.target;
        if (!files || files.length == 0) {
            setFile(undefined);
            return;
        }
        setFile(files[0]);
    }

    const resetPhoto = ()=>{
        if (!inputRef.current) return;
        inputRef.current.files = null;
        setFile(undefined);
    }

    return (
        <>
            <div className={className}>
                <label className={`block w-full py-3 text-center cursor-pointer text-white font-body text-lg outline-dashed outline-2 outline-white -outline-offset-2 rounded-lg ${file ? 'bg-slate-300' : 'bg-primary'}`}>
                    Upload Photo
                    <input ref={inputRef} type="file" name={name} id={name} className="hidden" onChange={handleFileUpload} disabled={file != undefined}/>
                </label>
                <div className="relative w-full">
                    {url 
                        ? <>
                            <img src={url} alt="Recipe Photo" width={'100%'} className="object-cover aspect-[16/9] rounded-lg overflow-hidden"/> 
                            <button type="button" aria-label="Reset photo" onClick={resetPhoto} className="absolute bottom-2 right-2 bg-blue-800 text-white p-2 rounded-full aspect-square grid place-items-center"><RefreshCcw aria-hidden='true'/></button>
                          </>
                        : <div className="text-xs text-slate-500 border-1 border-slate-500 rounded-lg text-center p-2">
                            Photo Preview will load on upload
                          </div>}
                    
                </div>
            </div>
        </>
    )
}


export default PhotoInputWithPreview;