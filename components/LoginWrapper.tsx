import { useSession } from "next-auth/react";
import Navbar from "../components/Navbar";
import { Login } from "../components/Login";

export function LoginWrapper({ children }: { children: React.ReactNode }) {
    const { data: session, status } = useSession();

    if (status === "loading") {
        return <></>;
    }

    if (!session) {
        return <Login />;
    }

    return (
        <>
            <Navbar />
            {children}
        </>
    );
}
