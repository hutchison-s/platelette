import Link from "next/link";

function PageFooter() {
    return (
        <footer className="p-std bg-primary2 text-background2">
          <div className="flex gap-2 flex-wrap text-sm font-light w-full justify-center font-inter">
            <span>&copy; Platelette 2025</span><span>Made by <Link href={'https://www.stevenhutchison.com'} className="underline text-background2 font-normal">Steven Hutchison</Link></span>
          </div>
        </footer>
    )
}

export default PageFooter;