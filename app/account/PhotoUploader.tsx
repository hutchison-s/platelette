'use client'
import React, { ChangeEvent, ChangeEventHandler, useEffect, useRef, useState } from 'react'
import ReactCrop, { centerCrop, makeAspectCrop, type Crop } from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import { ButtonStyles } from '../_components/ui/Buttons'
import { UserController } from '../_utils/apiController'
import { useAuth } from '../_hooks/useAuth'
import { v4 as uuidv4 } from 'uuid'
import { getS3UploadUrl } from '../_utils/helpers'

function PhotoUploader({closeEditor}: {closeEditor: ()=>void}) {
    const {user, update} = useAuth(); 
    const [crop, setCrop] = useState<Crop>()
    const [value, setValue] = useState<Blob>()
    const [objURL, setObjUrl] = useState<string | undefined>(undefined);
    const imgRef = useRef<HTMLImageElement>(null)
    // const [croppedUrl, setCroppedUrl] = useState<string | undefined>(undefined);

    const handleChange: ChangeEventHandler<HTMLInputElement> = (e)=>{
        const files = e.currentTarget.files
        if (!files || files.length == 0) return;
        const img = files[0];
        const url = URL.createObjectURL(img);
        setObjUrl(url);
    }

    function onImageLoad(e: ChangeEvent<HTMLImageElement>) {
        const { naturalWidth: width, naturalHeight: height } = e.currentTarget
      
        const crop = centerCrop(
          makeAspectCrop(
            {
              // You don't need to pass a complete crop into
              // makeAspectCrop or centerCrop.
              unit: '%',
              width: 60,
            },
            1,
            width,
            height
          ),
          width,
          height
        )
      
        setCrop(crop)
      }

      useEffect(()=>{
        console.log(crop)
      }, [crop])

      async function onComplete() {
        const image = imgRef.current;
        if (!image || !crop) {
            throw new Error('Crop canvas does not exist');
        }
    
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
    
        // Convert crop values from percentage to pixel values
        const cropX = crop.x * scaleX;
        const cropY = crop.y * scaleY;
        const cropWidth = crop.width * scaleX;
        const cropHeight = crop.height * scaleY;
    
        const canvas = document.createElement('canvas');
        canvas.width = cropWidth;
        canvas.height = cropHeight;
    
        const ctx = canvas.getContext('2d');
        if (!ctx) {
            throw new Error('No 2d context');
        }
    
        // Ensure the image is loaded before drawing
        const ctxImage = new Image();
        ctxImage.src = objURL!;
        await ctxImage.decode();
    
        ctx.drawImage(
            ctxImage,
            cropX, cropY, cropWidth, cropHeight, // Source (cropped area)
            0, 0, cropWidth, cropHeight // Destination (canvas size)
        );
    
        canvas.toBlob((blob) => {
            if (blob) {
                setValue(blob);
            }
        }, 'image/png');
    }

    const onCancel = ()=>{
        setObjUrl(undefined);
        closeEditor();
    }

    useEffect(()=>{
        if (!value) return;
        const photoId = uuidv4();
        const upload = async()=>{
            const link = await getS3UploadUrl(value.type, value.size, photoId);
            await fetch(link, {method: 'PUT', body: value});
            const photoURL = 'https://platelette-images.s3.us-east-1.amazonaws.com/'+photoId
            const controller = new UserController();
            await controller.update({
                ...user!,
                photo: photoURL
            }, '/'+user!.sub)
            update({...user!, photo: photoURL})
            console.log(value);
            setObjUrl(undefined);
            setValue(undefined);
            closeEditor();
        }
        upload()
        
    }, [closeEditor, update, user, value])


  return (
    objURL
        ? <>
            <ReactCrop crop={crop} onChange={(c)=>setCrop(c)} aspect={1} className='w-1/2 min-w-[250px] mx-auto'>
                <img src={objURL} alt='user photo' onLoad={onImageLoad} width={'100%'} ref={imgRef}/>
            </ReactCrop>
            <button className={ButtonStyles.primary} onClick={onComplete} type='button'>Upload</button>
            <button className={ButtonStyles.hollow} onClick={onCancel} type='button'>Cancel</button>
        </>
        
        : 
        <div className='flex w-full gap-2'>
            <label htmlFor="uploader" className='flex-1 bg-blue-600 text-background2 grid place-items-center p-2 rounded'>
                Choose Photo
                <input type="file" id='uploader' name='uploader' accept='image/jpg, image/png' onChange={handleChange} className='hidden'/>
            </label>
            <button onClick={onCancel} className='flex-1 bg-transparent border-1 border-blue-600 rounded p-2 grid place-items-center'>Cancel</button>
        </div>
  )
}

export default PhotoUploader