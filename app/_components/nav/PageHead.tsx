import Image from "next/image";
import Link from "next/link";
import logo from "@/public/logo.svg";
import MobileMenu from "./MobileMenu";
import WebMenu from "./WebMenu";
import RecipeSearch from "../tools/RecipeSearch";

function PageHead() {
    return (
        <header className="bg-gradient-to-tl from-primary2 to-primary py-2 px-xtra sticky top-0 z-20">
          <div className="flex gap-2 items-center justify-between w-full max-w-1000 mx-auto">
            <Link href={'/'} className="flex gap-2 items-center">
              <h1 className="font-display text-3xl text-white hidden sm:inline-block">Platelette</h1>
              <Image src={logo} alt='Logo' width={45} height={45}/>
            </Link>
            <MobileMenu />
            <div className="flex gap-4 items-center">
              <WebMenu />
              <RecipeSearch />
            </div>
          </div>
        </header>
    )
}

export default PageHead;