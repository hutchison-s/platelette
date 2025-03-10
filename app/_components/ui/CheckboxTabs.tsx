import React, { Dispatch } from 'react'

function CheckboxTabs({idx, setIdx, labels}: {idx: number, setIdx: Dispatch<number>, labels: string[]}) {
    let cols = `grid-cols-2`;
    switch(labels.length) {
        case 3:
            cols = 'grid-cols-3'
            break;
        case 4:
            cols = 'grid-cols-4'
            break;
        case 5:
            cols = 'grid-cols-5'
            break;
        default:
            break;
    }
  return (
    <div className={'grid w-full max-w-[400px] items-center my-4 '+cols}>
            {labels.map((label, index) => (
                <label key={index} className={(idx == index ? 'text-background2 font-normal bg-bottom' : 'bg-top text-secondary font-light')+' py-2 text-md border-b-1 border-primary transition-all text-center cursor-pointer overflow-hidden bg-gradient-to-t from-primary from-[50%] to-transparent to-[50%] bg-[auto_200%] rounded-t '}>
                    {label}
                    <input type="checkbox" name="sort" className='hidden' checked={idx == index} onChange={() => setIdx(index)}/>
                </label>
            ))}
            </div>
  )
}

export default CheckboxTabs