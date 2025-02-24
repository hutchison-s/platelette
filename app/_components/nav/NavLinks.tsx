import { Home, Info, PlusCircle } from "lucide-react";
import Link from "next/link";

function NavLinks({isOpen=true}: {isOpen?: boolean}) {
    return (
        <>
            <Link href={'/'} tabIndex={isOpen ? 0 : -1} aria-label="Home Page">
                <span className="sm:hidden"><Home aria-hidden="true"/></span>
                <span className="hidden sm:block">Home</span>
            </Link>
            <Link href={'/about'} tabIndex={isOpen ? 0 : -1} aria-label="About Page">
                <span className="sm:hidden"><Info aria-hidden="true"/></span>
                <span className="hidden sm:block">About</span>
            </Link>
            <Link href={'/create'} tabIndex={isOpen ? 0 : -1} aria-label="Create Page">
                <span className="sm:hidden"><PlusCircle aria-hidden="true"/></span>
                <span className="hidden sm:block">Create</span>
            </Link>
        </>
    )
}

export default NavLinks;