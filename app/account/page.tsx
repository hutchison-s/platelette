import { Metadata } from "next";
import AuthCheck from "../_hooks/AuthCheck";
import Profile from "./Profile";

export const metadata: Metadata = {
    title: "My Recipes - Platelette.com",
    description: "Manage your recipes on Platelette"
}

export default async function AccountPage() {
    return (
        <>
            <AuthCheck>
                <Profile />
            </AuthCheck>
        </>
    )
}