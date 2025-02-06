function SectionHeading({children, className}: {children: React.ReactNode, className?: string}) {
    const baseStyles = 'text-2xl font-display w-full border-b-2 border-primary2 text-secondary font-light my-4 pb-1 ';
    return (
        <h3 className={`${baseStyles} ${className ? className : ''}`}>{children}</h3>
    )
}

export default SectionHeading;