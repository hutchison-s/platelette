import Link from "next/link";
import { ButtonStyles } from "./Buttons";

type textSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl'
const sizeMap = {
    sm: 'text-sm',
    md: 'text-md',
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl',
    '3xl': 'text-3xl',
    '4xl': 'text-4xl'
}
function HeadingWithLink({children, href, linkText, size = '4xl', className}: {children: React.ReactNode, href: string, linkText: string, size?: textSize, className?: string}) {

    const baseStyles = 'font-heading w-full border-b-2 border-primary2 text-secondary [&:not(:first-child)]:pt-8 my-4 pb-1 '+sizeMap[size];
    
    
    return (
        <div className="relative">
            <h2 className={`${baseStyles} ${className ? className : ''} pt-2`}>{children}</h2>
            <Link className={ButtonStyles.primary+' absolute top-1/2 right-0 -translate-y-1/2 text-sm px-2 py-1'} href={href}>{linkText}</Link>
        </div>
    )
}

export default HeadingWithLink;