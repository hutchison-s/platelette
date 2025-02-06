function SectionHeading({children, className}: {children: React.ReactNode, className?: string}) {
    const baseStyles = 'text-2xl font-heading w-full border-b-2 border-primary2 text-secondary font-bold my-2 pb-1 ';
    return (
        <h3 className={`${baseStyles} ${className ? className : ''}`}>{children}</h3>
    )
}

export default SectionHeading;