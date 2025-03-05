import { Metadata } from "next";
import AuthCheck from "../_hooks/AuthCheck";
import Profile from "./Profile";

export const metadata: Metadata = {
    title: "Account - Platelette.com"
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