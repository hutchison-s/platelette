'use client'

import { MenuIcon } from "lucide-react";
import React, { useState } from "react"
import NavLinks from "./NavLinks";

function MobileMenu() {
    const [isOpen, setIsOpen] = useState(false);
    const toggleOpen = ()=>setIsOpen(o => !o);

    return (
        <nav onClick={toggleOpen} className={`fixed sm:hidden bottom-8 right-2 overflow-hidden shadow-foreground/25 shadow-lg size-12 rounded-full transition-all min-h-12 h-fit flex flex-col gap-4`}>
            <button className="text-white rounded-full bg-primary size-12 grid place-items-center absolute bottom-0 left-0"><MenuIcon /></button>
                <div className={`text-white w-full flex flex-col items-center bg-primary transition-all duration-600 ${isOpen ? 'flex-1 p-4 gap-4 pb-14' : 'flex-0 p-0 gap-0 pb-0'}`}>
                    <NavLinks />
                </div>

        </nav>
    )
}

export default MobileMenu;