import { LinkButton } from "./_components/ui/Buttons"

function NotFound() {
  return (
    <section className="w-full min-h-[600px] flex flex-col justify-center items-center gap-8">
        <p className="text-[8rem] text-primary font-black z-10">404</p>
      <h2 className="font-heading font-bold text-3xl text-center">Sorry, this page does not exist</h2>
      <LinkButton href='/'>Back to home page</LinkButton>
    </section>
  )
}

export default NotFound