import { Loader } from 'lucide-react'
import React from 'react'

function loading() {
  return (
    <Loader size={80} className='text-primary mx-auto my-6 animate-spin' />
  )
}

export default loading