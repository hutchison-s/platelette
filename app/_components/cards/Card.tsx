function Card({children, className}: {children: React.ReactNode, className?: string}) {
    return (
      <article className={`w-full min-h-40 rounded-xtra bg-background2 p-std shadow-lg ${className ? className : ''}`}>
        {children}
      </article>
    )
  }

  export default Card;