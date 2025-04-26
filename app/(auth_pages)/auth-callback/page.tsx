import { Suspense } from "react"
import AuthEffect from "./AuthEffect"
import { Loader } from "lucide-react"
import SectionHeading from "@/app/_components/ui/SectionHeading"
import PageWrapper from "@/app/_components/ui/PageWrapper"

function AuthPage() {
    
  return (
    <PageWrapper>
        <SectionHeading className="text-center my-6">Logging you in...</SectionHeading>
        <Suspense fallback={<Loader size={80} className="text-primary mx-auto my-6 animate-spin"/>}>
            <AuthEffect />
        </Suspense>
    </PageWrapper>
  )
}

export default AuthPage