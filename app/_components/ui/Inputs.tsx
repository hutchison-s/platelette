import { InputHTMLAttributes, TextareaHTMLAttributes } from "react"
  

export function TextInput({label, name, className='', defaultValue, ...rest}: {label: string, name: string, className?: string, defaultValue?: string, rest?: InputHTMLAttributes<HTMLInputElement>}) {
    return (
        <div className={"relative "+className}>
          <input type="text" name={name} id={name} defaultValue={defaultValue || ''} className="peer border-1 border-slate-500 rounded py-1 pt-6 px-3 w-full text-slate-700" placeholder=" " {...rest.rest}/>
          <label htmlFor={name} className="absolute transition-all duration-300 text-slate-500 top-1/2 left-3 -translate-y-6 scale-75 origin-top-left peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-slate-500 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-blue-600">{label}</label>
          
        </div>
    )
}

export function NumberInput({label, name, min = 1, max = 120, step = 1, className='', defaultValue, ...rest}: {label: string, name: string, min?: number, max?: number, step?: number, className?: string, defaultValue?: number, rest?: InputHTMLAttributes<HTMLInputElement>}) {
    return (
        <div className={"relative "+className}>
          <input type="number" name={name} id={name} min={min} max={max} step={step} defaultValue={defaultValue ? String(defaultValue) : ''} className="peer border-1 border-slate-500 rounded py-1 pt-6 px-3 w-full text-slate-700" placeholder=" " {...rest.rest}/>
          <label htmlFor={name} className="absolute transition-all duration-300 text-slate-500 top-1/2 left-3 -translate-y-6 scale-75 origin-top-left peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-slate-500 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-blue-600">{label}</label>
          
        </div>
    )
}

export function TextAreaInput({label, name, className='', defaultValue, textAreaClassName='', ...rest}: {label: string, name: string, className?: string, defaultValue?: string, textAreaClassName?: string, rest?: TextareaHTMLAttributes<HTMLTextAreaElement>}) {
    return (
        <div className={"relative "+className}>
          <textarea name={name} id={name} className={"peer border-1 border-slate-500 rounded py-1 pt-6 px-3 w-full text-slate-700 "+textAreaClassName} placeholder=" " {...rest.rest} defaultValue={defaultValue || ''}></textarea>
          <label htmlFor={name} className="absolute transition-all duration-300 text-slate-500 top-1 left-3 translate-y-0 scale-75 origin-top-left peer-placeholder-shown:translate-y-2 peer-placeholder-shown:text-slate-500 peer-placeholder-shown:scale-100 peer-focus:translate-y-0 peer-focus:scale-75 peer-focus:text-blue-600">{label}</label>
          
        </div>
    )
}



export function IngredientInput({index, className='', defaultValue}: {index: number, className?: string, defaultValue?: {qty: number, measure: string, name: string}}) {
    return (
        <div className={"flex gap-2 items-center "+className}>
            <MeasuresList />
            <TextInput label="Qty" name={`qty-${index}`} defaultValue={defaultValue ? String(defaultValue.qty) : ''} className="w-24" rest={{required: true, title: 'Enter a valid number (e.g. 1.5, 3/4, 12)'}}/>
            <TextInput label="Measure" defaultValue={defaultValue?.measure || undefined} name={`measure-${index}`} className="" rest={{list: "unit-options", title: 'Provide a measurement unit such as "Tbsp," "Clove," or leave blank for counting the whole ingredient'}} />
            <TextInput label="Ingredient Name" name={`ingredient_name-${index}`} defaultValue={defaultValue?.name || ''} className="grow"/>
        </div>
    )
}

export function InstructionInput({index, className='', defaultValue}: {index: number, className?: string, defaultValue?: string}) {
    return (
        <TextAreaInput label={`Step ${index+1}`} name={`step-${index}`} defaultValue={defaultValue || ''} className={"w-full mx-auto max-w-600 "+className} textAreaClassName="resize-none" rest={{rows: 2}} />
    )
}


function MeasuresList() {
    return (
        <datalist id="unit-options">
  <option value="teaspoon"/>
  <option value="teaspoons"/>
  <option value="tsp"/>

  <option value="tablespoon"/>
  <option value="tablespoons"/>
  <option value="tbsp"/>

  <option value="fluid oz"/>
  <option value="fluid ounce"/>
  <option value="fluid ounces"/>
  <option value="fl oz"/>

  <option value="cup"/>
  <option value="cups"/>

  <option value="pint"/>
  <option value="pints"/>
  <option value="pt"/>

  <option value="quart"/>
  <option value="quarts"/>
  <option value="qt"/>

  <option value="gallon"/>
  <option value="gallons"/>
  <option value="gal"/>

  <option value="ml"/>
  <option value="milliliter"/>
  <option value="milliliters"/>

  <option value="liter"/>
  <option value="liters"/>
  <option value="l"/>

  <option value="oz"/>
  <option value="ounce"/>
  <option value="ounces"/>

  <option value="lb"/>
  <option value="pound"/>
  <option value="pounds"/>

  <option value="gram"/>
  <option value="grams"/>
  <option value="g"/>

  <option value="kilogram"/>
  <option value="kilograms"/>
  <option value="kg"/>

  <option value="piece"/>
  <option value="pieces"/>

  <option value="handful"/>
  <option value="handfuls"/>

  <option value="head"/>
  <option value="heads"/>

  <option value="slice"/>
  <option value="slices"/>

  <option value="clove"/>
  <option value="cloves"/>

  <option value="stick"/>
  <option value="sticks"/>

  <option value="pinch"/>
  <option value="pinches"/>

  <option value="dash"/>
  <option value="dashes"/>

  <option value="can"/>
  <option value="cans"/>

  <option value="jar"/>
  <option value="jars"/>

  <option value="package"/>
  <option value="packages"/>

  <option value="bunch"/>
  <option value="bunches"/>

  <option value="bag"/>
  <option value="bags"/>

  <option value="container"/>
  <option value="containers"/>
</datalist>

    )
}
