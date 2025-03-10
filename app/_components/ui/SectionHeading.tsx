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
function SectionHeading({children, size = '4xl', className}: {children: React.ReactNode, size?: textSize, className?: string}) {
    const baseStyles = 'font-heading w-full border-b-2 border-primary2 text-secondary [&:not(:first-child)]:pt-8 my-4 pb-1 '+sizeMap[size];
    
    
    return (
        <h2 className={`${baseStyles} ${className ? className : ''}`}>{children}</h2>
    )
}

export default SectionHeading;