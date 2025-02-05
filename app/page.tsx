
function Card({children, className}: {children: React.ReactNode, className?: string}) {
  return (
    <article className={`w-full min-h-40 rounded-xtra bg-background2 p-std shadow-lg ${className ? className : ''}`}>
      {children}
    </article>
  )
}

export default function Home() {
  return (
    <>
      <section className="size-full grid place-itmes-center gap-2 max-w-600 mx-auto pt-8">
        <Card className="grid place-items-center">
          <p className="text-center text-primary2 text-2xl font-heading font-bold">Coming Soon</p>
          <p className="text-foreground">Check back soon for updates...</p>
        </Card>

      </section>
    </>
  );
}
