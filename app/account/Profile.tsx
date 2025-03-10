'use client'

import React, { useState } from 'react'
import { useAuth } from '../_hooks/useAuth';
import CheckboxTabs from '../_components/ui/CheckboxTabs';
import UserRecipes from './_components/UserRecipes';
import AccountSettings from './_components/AccountSettings';
import Favorites from './_components/Favorites';
import UserConnections from './_components/UserConnections';


const pages = ['Recipes', 'Favorites', 'Connect', 'Settings'];

function Profile() {
    const {user} = useAuth();
    const [page, setPage] = useState(0);

    if (!user) {
        return (
            <div className="flex flex-col items-center justify-center">
                <h1 className="text-2xl font-bold">Please log in to view your profile</h1>
            </div>
        )
    }
  return (
    <>
        <h2 className='font-heading font-bold my-4 text-2xl md:text-5xl text-transparent bg-gradient-to-tl from-primary to-foreground bg-clip-text'>
            Welcome, {user.name}!
        </h2>
        

        {/* Mobile */}
        <section className='block md:hidden'>
            <CheckboxTabs
                idx={page}
                setIdx={setPage}
                labels={pages}
            />
            {page == 0 && <UserRecipes profile={user} />}
            {page == 1 && <Favorites />}
            {page == 2 && <UserConnections />}
            {page == 3 && <AccountSettings />}  
        </section>

        {/* Desktop */}
        <section className='hidden md:grid gap-4 justify-center grid-cols-1 lg:grid-cols-2'>
            <div className="rounded-lg border-secondary/50 p-4 border-1">
                <UserRecipes profile={user}/>
            </div>
            <div className="rounded-lg border-secondary/50 p-4 border-1">
                <Favorites />
            </div>
            <div className="rounded-lg border-secondary/50 p-4 border-1">
                <UserConnections />
            </div>
            <div className="rounded-lg border-secondary/50 p-4 border-1">
                <AccountSettings />
            </div>
        </section>        
        
    </>
  )
}

export default Profile