import Link from 'next/link'
import React from 'react'

function TagLinks({tags}: {tags: string[]}) {
    return (
        <div className="text-primary2 text-sm font-light font-body flex gap-2">
            {tags?.slice(0,4).map((tag, idx) => {
                return (
                    <div key={idx} className='flex gap-2 items-center'>
                    {idx !== 0 && <span>{'  |  '}</span>}
                    <span className='hover:underline transition-all duration-200'>
                        
                        <Link href={`/search?query=${tag}`}>{tag}</Link>
                    </span>
                    </div>
                    
                    
                )
            })}
        </div>
    )
}

export default TagLinks