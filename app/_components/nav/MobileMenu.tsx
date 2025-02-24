'use client'

import { MenuIcon } from "lucide-react";
import React, { useEffect, useRef, useState } from "react"
import NavLinks from "./NavLinks";

function MobileMenu() {
    const navRef = useRef<HTMLDivElement>(null);
    const toggleRef = useRef<HTMLButtonElement>(null);
    const [isOpen, setIsOpen] = useState(false);
    const toggleOpen = ()=>setIsOpen(o => !o);
    const closeMenu = ()=>{
        setIsOpen(false);
        toggleRef.current?.focus()
    };

    useEffect(()=>{
        const nav = navRef.current;
        const handleFocusLoss = (e: FocusEvent)=>{
            if (!navRef.current?.contains(e.relatedTarget as Node | null) && isOpen) {
                closeMenu()
            }
        }
        const escToClose = (e: KeyboardEvent)=>{
            console.log(e.key)
            if (e.key == 'Escape') closeMenu()
        }
        const handleClickOutside = (e: MouseEvent) => {
            if (isOpen && navRef.current && !navRef.current.contains(e.target as Node)) {
                closeMenu();
            }
        };
        if (isOpen) {
            window.addEventListener('keyup', escToClose)
            nav?.addEventListener('focusout', handleFocusLoss)
            document.addEventListener("click", handleClickOutside);
        } else {
            window.removeEventListener('keyup', escToClose)
            nav?.removeEventListener('focusout', handleFocusLoss)
            document.removeEventListener("click", handleClickOutside);
        }
        return ()=>{
            nav?.removeEventListener('focusout', handleFocusLoss)
            window.removeEventListener('keyup', escToClose)
            document.removeEventListener("click", handleClickOutside);
            
        }
    }, [isOpen])

    return (
        <div ref={navRef}  className={`fixed sm:hidden bottom-8 right-2 overflow-hidden shadow-foreground/25 shadow-lg size-12 rounded-full transition-all min-h-12 h-fit flex flex-col gap-4 print:hidden`} >
            <button ref={toggleRef} onClick={toggleOpen} id="mobileMenu" className="text-white rounded-full bg-primary size-12 grid place-items-center absolute bottom-0 left-0" aria-label="Menu" aria-expanded={isOpen}><MenuIcon aria-hidden="true"/></button>
                <nav onClick={closeMenu} className={`text-white w-full flex flex-col overflow-hidden items-center bg-primary transition-all duration-600 ${isOpen ? 'p-4 gap-4 pb-14 shrink-0' : 'shrink h-0 p-0 gap-0 pb-0'}`} >
                    <NavLinks isOpen={isOpen}/>
                </nav>

        </div>
    )
}

export default MobileMenu;