import { Suspense } from "react"
import SectionHeading from "../_components/ui/SectionHeading"
import AuthEffect from "./AuthEffect"

function AuthPage() {
    
  return (
    <div>
        <SectionHeading>Auth</SectionHeading>
        <Suspense fallback="...">
            <AuthEffect />
        </Suspense>
    </div>
  )
}

export default AuthPage