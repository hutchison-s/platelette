import Link from 'next/link'
import React from 'react'

function TagLinks({tags}: {tags: string[]}) {
    return (
        <div className="text-primary2 text-sm font-light font-body flex gap-2">
            {tags?.map((tag, idx) => {
                return (
                    <span key={idx}>
                        {idx !== 0 && '  |  '}
                        <Link href={`/search?query=${tag}`}>{tag}</Link>
                    </span>
                    
                )
            })}
        </div>
    )
}

export default TagLinks