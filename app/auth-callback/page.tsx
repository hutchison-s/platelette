import { Suspense } from "react"
import SectionHeading from "../_components/ui/SectionHeading"
import AuthEffect from "./AuthEffect"
import { Loader } from "lucide-react"

function AuthPage() {
    
  return (
    <div>
        <SectionHeading className="text-center my-6">Logging you in...</SectionHeading>
        <Suspense fallback={<Loader size={80} className="text-primary mx-auto my-6 animate-spin"/>}>
            <AuthEffect />
        </Suspense>
    </div>
  )
}

export default AuthPage