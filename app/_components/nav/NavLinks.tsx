import { Home, Info, PlusCircle } from "lucide-react";
import Link from "next/link";

function NavLinks() {
    return (
        <>
            <Link href={'/'}>
                <span className="sm:hidden"><Home /></span>
                <span className="hidden sm:block">Home</span>
            </Link>
            <Link href={'/about'}>
                <span className="sm:hidden"><Info /></span>
                <span className="hidden sm:block">About</span>
            </Link>
            <Link href={'/create'}>
                <span className="sm:hidden"><PlusCircle /></span>
                <span className="hidden sm:block">Create</span>
            </Link>
        </>
    )
}

export default NavLinks;