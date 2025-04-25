import React from 'react'

function PageWrapper({children, isNarrow = false}: {children: React.ReactNode, isNarrow?: boolean}) {
  return (
    <div className={`${isNarrow ? 'max-w-[1000px]' : 'max-w-[1400px]'} mx-auto px-2 sm:px-4 pb-8 min-h-screen`}>
        {children}
    </div>
  )
}

export default PageWrapper