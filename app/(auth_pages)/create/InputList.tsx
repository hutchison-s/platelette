'use client'

import React, { useState } from 'react'

function InputList<propsType extends object>({ label, Component, componentProps, className, initial }: { 
  label: string; 
  Component: React.FC<propsType & {index: number}>, 
  componentProps?: propsType,
  className?: string,
  initial?: React.ReactNode[] 
}) {
    const [inputs, setInputs] = useState<React.ReactNode[]>(initial ? initial : [<Component key={0} index={0} {...(componentProps as propsType)} />])

    const addComp = () => {
        setInputs(prev => [...prev, <Component key={prev.length} index={prev.length} {...(componentProps as propsType)} />])
    }
    const deleteComp = ()=>{
      setInputs(prev => [...prev.slice(0, prev.length - 1)])
    }


    return (
        <>
            <div className={"w-full grid gap-2 "+className}>
                {inputs}
            </div>
            <div className={"w-full flex justify-center gap-4 "+className}>
            {inputs.length > 1 && <button type='button' className='border-1 border-blue-700 text-blue-700 font-body font-light w-fit px-6 py-1 rounded-lg mx-auto transition-all hover:border-blue-600 hover:shadow-lg' onClick={deleteComp}>Delete {label}</button>}
              <button type='button' className='bg-blue-700 text-white font-body font-light w-fit px-6 py-1 rounded-lg mx-auto transition-all hover:bg-blue-600 hover:shadow-lg' onClick={addComp}>Add {label}</button>
              
            </div>
        </>
    )
}

export default InputList
