import Link from "next/link"

type ButtonVariant = 'primary' | 'hollow' | 'small'

const buttonStyle1 = 'transition-all duration-200 py-2 px-5 bg-blue-700 hover:bg-blue-600 text-white font-body uppercase font-light text-lg rounded-full shadow-md hover:shadow-lg'
const buttonStyle2 = 'transition-all duration-200 py-2 px-5 border-[1px] border-blue-800 bg-transparent hover:border-blue-600 text-foreground hover:text-blue-800 font-body uppercase font-light text-lg rounded-full shadow-md hover:shadow-lg'
const buttonStyle3 = 'transition-all duration-200 py-1 px-3 bg-blue-600 hover:scale-105 text-white font-body uppercase text-md rounded-full shadow-sm hover:shadow-md'


export const ButtonStyles: Record<ButtonVariant, string> = {
    primary: buttonStyle1,
    hollow: buttonStyle2,
    small: buttonStyle3
}

export function Button({children, variant = 'primary', className, ...rest}: {children: React.ReactNode, variant?: ButtonVariant, className?: string}) {
    return <button className={ButtonStyles[variant]+` ${className ?? ''}`} {...rest}>{children}</button>
}

export function LinkButton({children, href, variant = 'primary', className, ...rest}: {children: React.ReactNode, href: string, variant?: ButtonVariant, className?: string}) {
    return <Link href={href} className={ButtonStyles[variant]+` ${className ?? ''}`} {...rest}>{children}</Link>
}