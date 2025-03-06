import { InputHTMLAttributes, TextareaHTMLAttributes } from "react"
import SelectInput from "./SelectInput";

const units = [
    { label: 'Teaspoon', value: 'tsp' },
    { label: 'Tablespoon', value: 'tbsp' },
    { label: 'Fluid Ounce', value: 'fl_oz' },
    { label: 'Cup', value: 'cup' },
    { label: 'Pint', value: 'pt' },
    { label: 'Quart', value: 'qt' },
    { label: 'Gallon', value: 'gal' },
    { label: 'Milliliter', value: 'ml' },
    { label: 'Liter', value: 'l' },
    
    { label: 'Ounce', value: 'oz' },
    { label: 'Pound', value: 'lb' },
    { label: 'Gram', value: 'g' },
    { label: 'Kilogram', value: 'kg' },
  
    { label: 'Piece', value: 'piece' },
    { label: 'N/A', value: 'piece' },
    { label: 'Head', value: 'head' },
    { label: 'Slice', value: 'slice' },
    { label: 'Clove', value: 'clove' },
    { label: 'Stick', value: 'stick' },
    { label: 'Pinch', value: 'pinch' },
    { label: 'Dash', value: 'dash' }
  ];
  

export function TextInput({label, name, className='', ...rest}: {label: string, name: string, className?: string, rest?: InputHTMLAttributes<HTMLInputElement>}) {
    return (
        <div className={"relative "+className}>
          <input type="text" name={name} id={name} className="peer border-1 border-slate-500 rounded py-1 pt-6 px-3 w-full text-slate-700" placeholder=" " {...rest.rest}/>
          <label htmlFor={name} className="absolute transition-all duration-300 text-slate-500 top-1/2 left-3 -translate-y-6 scale-75 origin-top-left peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-slate-500 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-blue-600">{label}</label>
          
        </div>
    )
}

export function NumberInput({label, name, min = 1, max = 120, step = 1, className='', ...rest}: {label: string, name: string, min?: number, max?: number, step?: number, className?: string, rest?: InputHTMLAttributes<HTMLInputElement>}) {
    return (
        <div className={"relative "+className}>
          <input type="number" name={name} id={name} min={min} max={max} step={step} className="peer border-1 border-slate-500 rounded py-1 pt-6 px-3 w-full text-slate-700" placeholder=" " {...rest.rest}/>
          <label htmlFor={name} className="absolute transition-all duration-300 text-slate-500 top-1/2 left-3 -translate-y-6 scale-75 origin-top-left peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-slate-500 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-blue-600">{label}</label>
          
        </div>
    )
}

export function TextAreaInput({label, name, className='', textAreaClassName='', ...rest}: {label: string, name: string, className?: string, textAreaClassName?: string, rest?: TextareaHTMLAttributes<HTMLTextAreaElement>}) {
    return (
        <div className={"relative "+className}>
          <textarea name={name} id={name} className={"peer border-1 border-slate-500 rounded py-1 pt-6 px-3 w-full text-slate-700 "+textAreaClassName} placeholder=" " {...rest.rest} />
          <label htmlFor={name} className="absolute transition-all duration-300 text-slate-500 top-1 left-3 translate-y-0 scale-75 origin-top-left peer-placeholder-shown:translate-y-2 peer-placeholder-shown:text-slate-500 peer-placeholder-shown:scale-100 peer-focus:translate-y-0 peer-focus:scale-75 peer-focus:text-blue-600">{label}</label>
          
        </div>
    )
}



export function IngredientInput({index, className=''}: {index: number, className?: string}) {
    return (
        <div className={"flex gap-2 items-center "+className}>
            <TextInput label="Qty" name={`qty-${index}`} className="w-24" rest={{required: true, title: 'Enter a valid number (e.g. 1.5, 3/4, 12)'}}/>
            <SelectInput label="Measure" name={`measure-${index}`} options={units} className="h-full" rest={{title: 'Select a measurement unit or "Piece" for counting the whole ingredient'}} />
            <TextInput label="Ingredient Name" name={`ingredient_name-${index}`} className="grow"/>
        </div>
    )
}

export function InstructionInput({index, className=''}: {index: number, className?: string}) {
    return (
        <TextAreaInput label={`Step ${index+1}`} name={`step-${index}`} className={"w-full mx-auto max-w-600 "+className} textAreaClassName="resize-none" rest={{rows: 2}} />
    )
}

