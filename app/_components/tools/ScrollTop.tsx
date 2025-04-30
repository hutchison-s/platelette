'use client'

import React, { useEffect } from 'react'

function ScrollTop() {
    useEffect(() => {
        window.scrollTo({top: 0, left: 0, behavior: 'instant'})
    }, []);
  return <></>
}

export default ScrollTop