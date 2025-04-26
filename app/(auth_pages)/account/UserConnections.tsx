'use client'
import React, { useEffect, useState } from 'react'
import SectionHeading from '../../_components/ui/SectionHeading'
import { useAuth } from '../../_hooks/useAuth';
import { AuthorInfo } from '../../types';
import UserCard from '../../_components/cards/UserCard';

function UserConnections() {

  const {user, access} = useAuth();
  const [following, setFollowing] = useState<AuthorInfo[]>([]);
  const [followers, setFollowers] = useState<AuthorInfo[]>([]);

  useEffect(()=>{
    if (!user || !access) return;

    // Fetch the user's connections (following)
    fetch(`https://api.platelette.com/accounts/${user.sub}/following`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${access}`
      }
    }).then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Failed to fetch following, '+ response.status);
      }
    }
    ).then(data => {
      setFollowing(data.followers || []);
    }).catch(error => {
      console.error('Error fetching following:', error);
    })

    // Fetch the user's followers
    fetch(`https://api.platelette.com/accounts/${user.sub}/followers`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${access}`
      }
    }).then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Failed to fetch followers, ' + response.status);
      }
    }
    ).then(data => {
      setFollowers(data.followers || []);
    }
    ).catch(error => {
      console.error('Error fetching followers:', error);
    }
    )
  }
    , [user, access])

  if (!user || !access) return null;


  return (
    <>
        <SectionHeading size='3xl'>
            Creators you follow
        </SectionHeading>
        <div className='grid gap-2 w-full min-h-40 pb-8'>
          {following.length > 0
            ? following.map((u) => <UserCard key={u.sub} profile={u} />)
            : <p className='text-muted-foreground'>You are not following any creators yet.</p>
                }
        </div>
        <SectionHeading size='3xl'>
            Creators following you
        </SectionHeading>
        <div className='grid gap-2 w-full min-h-40 pb-8'>
          {followers.length > 0
            ? followers.map((u) => <UserCard key={u.sub} profile={u} />)
            : <p className='text-muted-foreground'>You have no followers yet.</p>
                }
        </div>
    </>
  )
}

export default UserConnections