import { Metadata } from "next";
import AuthCheck from "../../_hooks/AuthCheck";
import Profile from "./Profile";
import PageWrapper from "../../_components/ui/PageWrapper";

export const metadata: Metadata = {
    title: "My Recipes - Platelette.com",
    description: "Manage your recipes on Platelette"
}

export default async function AccountPage() {
    return (
        <>
            <AuthCheck>
                <PageWrapper>
                    <Profile />
                </PageWrapper>
                
            </AuthCheck>
        </>
    )
}