import React from 'react'
import PageWrapper from '../_components/ui/PageWrapper'

function layout({children}: {children: React.ReactNode}) {
  return (
    <PageWrapper>
        {children}
    </PageWrapper>
  )
}

export default layout