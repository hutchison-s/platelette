'use client'

import React from 'react'
import { useAuth } from '../../_hooks/useAuth'
import LikedRecipes from '../../_components/LikedRecipes';

function Favorites() {
  const {user} = useAuth();
  if (!user) return;
  return (
    <>
        <LikedRecipes profile={user} />
    </>
  )
}

export default Favorites