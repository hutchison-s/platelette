import Link from "next/link"

type ButtonVariant = 'primary' | 'hollow'

const buttonStyle1 = 'transition-all duration-200 py-2 px-5 bg-blue-700 hover:bg-blue-600 text-white font-body uppercase font-light text-lg rounded-full shadow-md hover:shadow-lg'
const buttonStyle2 = 'transition-all duration-200 py-2 px-5 border-[1px] border-blue-800 bg-transparent hover:border-blue-600 text-foreground hover:text-blue-800 font-body uppercase font-light text-lg rounded-full shadow-md hover:shadow-lg'

const styles: Record<ButtonVariant, string> = {
    primary: buttonStyle1,
    hollow: buttonStyle2
}

export function Button({children, variant = 'primary', onClick, className, ...rest}: {children: React.ReactNode, variant?: ButtonVariant, onClick?: ()=>void, className?: string}) {
    return <button onClick={onClick} className={styles[variant]+` ${className ?? ''}`} {...rest}>{children}</button>
}

export function LinkButton({children, href, variant = 'primary', className, ...rest}: {children: React.ReactNode, href: string, variant?: ButtonVariant, className?: string}) {
    return <Link href={href} className={styles[variant]+` ${className ?? ''}`} {...rest}>{children}</Link>
}