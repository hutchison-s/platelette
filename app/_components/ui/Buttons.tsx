import Link from "next/link"

const buttonStyle1 = 'transition-all duration-200 py-2 px-5 bg-blue-700 hover:bg-blue-600 text-white font-body uppercase font-light text-lg rounded-full shadow-md hover:shadow-lg'

export function Button({children, className, ...rest}: {children: React.ReactNode, className?: string}) {
    return <button className={buttonStyle1+` ${className ?? ''}`} {...rest}>{children}</button>
}

export function LinkButton({children, href, className, ...rest}: {children: React.ReactNode, href: string, className?: string}) {
    return <Link href={href} className={buttonStyle1+` ${className ?? ''}`} {...rest}>{children}</Link>
}