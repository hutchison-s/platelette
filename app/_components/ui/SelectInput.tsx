'use client'

import { SelectHTMLAttributes, useState } from "react"

type SelectEntry = {label: string, value: string | number}



export default function SelectInput({label, name, options, className='', ...rest}: {label: string, name: string, options: SelectEntry[], className?: string, rest?: SelectHTMLAttributes<HTMLSelectElement>}) {
    const [selected, setSelected] = useState<string | undefined>();
    return (
        <div className={"relative h-full"+className}>
          <select name={name} id={name} required className="peer truncate border-1 border-slate-500 rounded py-1 pt-6 px-3 w-full text-slate-700" {...rest.rest} value={selected} onChange={(e)=>setSelected(e.target.value)}>
            <option value={undefined} className="text-primary" > </option>
            {options.map((opt, i)=><option key={i} value={opt.value} className="text-slate-500">{opt.label}</option>)}
          </select>
          <label htmlFor={name} className={`absolute top-1/2 left-3 origin-top-left scale-75 text-slate-500 transition-all peer-focus:text-blue-600 peer-invalid:scale-100 ${selected ? '-translate-y-6' : '-translate-y-1/2'}`}>{label}</label>
        </div>
    )
}