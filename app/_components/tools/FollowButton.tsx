'use client'

import React, { useEffect, useState } from 'react'
import { ButtonStyles } from '../ui/Buttons'
import { useAuth } from '@/app/_hooks/useAuth';
import Link from 'next/link';

function FollowButton({target_user_id}: {target_user_id?: string}) {

    const {user, access} = useAuth();

    const [isFollowing, setIsFollowing] = useState(false);

    const handleFollow = async () => {
        const res = await fetch(`https://api.platelette.com/accounts/${user?.sub}/following`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access}`
            },
            body: JSON.stringify({target_user: target_user_id})
        })
        if (res.ok) {
            setIsFollowing(true);
        } else {
            console.error('Failed to follow user');
        }
    }

    const handleUnfollow = async ()=>{
        const res = await fetch(`https://api.platelette.com/accounts/${user?.sub}/unfollow`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access}`
            },
            body: JSON.stringify({target_user: target_user_id})
        })
        if (res.ok) {
            setIsFollowing(false);
        } else {
            console.error('Failed to follow user');
        }
    }

    useEffect(()=>{
        if (!user || !access) return;

        // Check if the user is already following the target user
        fetch(`https://api.platelette.com/accounts/${user.sub}/following`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${access}`
            }
        }).then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Failed to fetch following status, ' + response.status);
            }
        }
        ).then(data => {
            const following = data.followers || [];
            setIsFollowing(following.some((u: { sub: string }) => u.sub === target_user_id));
        }
        ).catch(error => {
            console.error('Error fetching following status:', error);
        }
        )

    }, [access, target_user_id, user])

    if (target_user_id === user?.sub) return null; // Don't show follow button for self
  return (
    user?.name
        ? isFollowing
            ?   <button className={ButtonStyles.small+' block self-end'} onClick={handleUnfollow}>Unfollow</button>
            :   <button className={ButtonStyles.small+' block self-end'} onClick={handleFollow}>Follow</button>
        : <Link href={'/login'} className={ButtonStyles.small+' block self-end'}>Log in to follow</Link>
  )
}

export default FollowButton