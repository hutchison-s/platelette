function SectionHeading({children, className}: {children: React.ReactNode, className?: string}) {
    const baseStyles = 'text-4xl font-heading w-full border-b-2 border-primary2 text-secondary [&:not(:first-child)]:pt-8 my-4 pb-1 ';
    return (
        <h2 className={`${baseStyles} ${className ? className : ''}`}>{children}</h2>
    )
}

export default SectionHeading;