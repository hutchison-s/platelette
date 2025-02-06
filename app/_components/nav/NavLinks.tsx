import { Home, Info } from "lucide-react";
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
        </>
    )
}

export default NavLinks;