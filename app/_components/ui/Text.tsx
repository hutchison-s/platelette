export function BodyText({children, className=''}: {children: React.ReactNode, className?: string}) {
    return (
        <p className={"text-foreground font-light text-lg font-body leading-normal md:leading-loose "+className}>
            {children}
        </p>
    )
}

export function FeaturedText({children, className=''}: {children: React.ReactNode, className?: string}) {
    return (
        <p className={"font-heading font-light text-xl md:leading-loose text-transparent bg-gradient-to-tl from-primary to-foreground bg-clip-text py-8 md:text-3xl xl:text-4xl lg:flex-1 xl:leading-[3.2rem] "+className}>
            {children}
        </p>
    )
}