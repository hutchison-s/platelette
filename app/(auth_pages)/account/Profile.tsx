'use client'

import React, { useState } from 'react'
import { useAuth } from '../../_hooks/useAuth';
import CheckboxTabs from '../../_components/ui/CheckboxTabs';
import AccountSettings from './AccountSettings';
import Favorites from './Favorites';
import UserConnections from './UserConnections';
import RecipeManager from './RecipeManager';


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
        <h2 className='font-heading font-light my-4 md:my-8 text-2xl md:text-5xl text-transparent bg-gradient-to-tl from-primary to-foreground bg-clip-text'>
            Welcome, {user.name}!
        </h2>
        

        {/* Mobile */}
        <section className='block md:hidden'>
            <CheckboxTabs
                idx={page}
                setIdx={setPage}
                labels={pages}
            />
            {page == 0 && <RecipeManager />}
            {page == 1 && <Favorites />}
            {page == 2 && <UserConnections />}
            {page == 3 && <AccountSettings />}  
        </section>

        {/* Desktop */}
        <section className='hidden md:grid gap-4 justify-center grid-cols-1 lg:grid-cols-2'>
            <div className="flex flex-col gap-4">
                <div className="rounded-lg border-secondary/50 p-4 border-1">
                    <RecipeManager />
                </div>
                <div className="rounded-lg border-secondary/50 p-4 border-1">
                    <Favorites />
                </div>
            </div>
            <div className="flex flex-col gap-4">
                <div className="rounded-lg border-secondary/50 p-4 border-1">
                    <AccountSettings />
                </div>
                <div className="rounded-lg border-secondary/50 p-4 border-1">
                    <UserConnections />
                </div>
                
            </div>
        </section>        
        
    </>
  )
}

export default Profile