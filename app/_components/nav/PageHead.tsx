import Image from "next/image";
import Link from "next/link";
import logo from "@/public/logo.svg";
import MobileMenu from "./MobileMenu";
import WebMenu from "./WebMenu";
import SearchPanel from "./SearchPanel";
import { Search } from "lucide-react";
import Initial from "./Initial";

function PageHead() {
    return (
        <>
        <header className="sticky top-0 z-20">
          <div className="group relative w-full px-2 bg-gradient-to-tl from-primary2 to-primary">
            <div className="relative z-0 max-w-[1200px]  py-2 px-xtra flex gap-2 items-center justify-between w-full mx-auto">
              <div className="flex gap-2 items-center">
            
                <Link href={'/'} className="flex gap-2 items-center">
                  <h1 className="font-display text-3xl text-white hidden sm:inline-block">Platelette</h1>
                  <Image src={logo} alt='Logo' width={45} height={45}/>
                </Link>
              </div>
              <MobileMenu />
              <div className="relative flex gap-4 items-center">
                <WebMenu />
                <label htmlFor="searchToggle" className='cursor-pointer text-white' aria-label='Show search bar'><Search size={30} className='border-background2 group-has-[input:checked]:bg-background2 group-has-[input:checked]:text-primary p-1 rounded' aria-hidden='true'/><input type="checkbox" name="searchToggle" id="searchToggle" className='hidden'/></label>
                <Initial />
              </div>
            </div>
            <SearchPanel />
          </div>
        </header>
        
        </>
    )
}

export default PageHead;