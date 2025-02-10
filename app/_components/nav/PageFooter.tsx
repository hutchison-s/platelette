import Link from "next/link";

function PageFooter() {
    return (
        <footer className="p-std">
          <div className="flex gap-2 flex-wrap text-sm font-light w-full justify-center font-inter text-foreground/75">
            <span>&copy; Platelette 2025</span><span>Made by <Link href={'https://www.stevenhutchison.com'} className="underline text-primary">Steven Hutchison</Link></span>
          </div>
        </footer>
    )
}

export default PageFooter;