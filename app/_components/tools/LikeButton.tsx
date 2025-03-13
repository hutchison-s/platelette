'use client'

import { Heart } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { ButtonStyles } from '../ui/Buttons'
import { useAuth } from '@/app/_hooks/useAuth'
import { useApiController } from '@/app/_hooks/useApiController'

function LikeButton({recipe_id}: {recipe_id: string}) {
    const {user} = useAuth();
    const {Users} = useApiController();
    const [isLiked, setIsLiked] = useState(false);

    useEffect(()=>{
        if (!user) return;
        Users().getLikedRecipes(user.sub!).then(response => {
            if (!response || !response.items) return;
            if (response.items.findIndex(r => r.id == recipe_id) !== -1) {
                setIsLiked(true);
            }
        })
    }, [Users, recipe_id, user])

    const toggleLike = () => {
        if (!user) return;
        if (isLiked) {
            Users().unlikeRecipe(user.sub!, recipe_id)
                .then((res)=>{
                    if (!res || !res.ok) throw new Error(res?.statusText)
                    setIsLiked(false)
                })
                .catch(err => {
                    console.error(err);
                })
        } else {
            Users().likeRecipe(user.sub!, recipe_id)
                .then((res)=>{
                    if (!res || !res.ok) throw new Error(res?.statusText)
                    setIsLiked(true)
                })
                .catch(err => {
                    console.error(err);
                });
        }
    }

  return (
    <button className={ButtonStyles.primary+` ${isLiked ? 'bg-primary hover:bg-secondary' : 'bg-blue-700'}`} onClick={toggleLike} aria-label={isLiked ? 'Unlike recipe' : 'Like Recipe'}><Heart aria-hidden='true' fill={isLiked ? 'white' : 'none'}/></button>
  )
}

export default LikeButton