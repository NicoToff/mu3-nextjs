import { useSession } from "next-auth/react";
import Navbar from "../components/Navbar";
import { Login } from "../components/Login";

export default function System() {
    const { data: session } = useSession();

    if (!session) {
        return <Login />;
    }

    return (
        <>
            <Navbar />
            {/* on doit affichez de maniere vendable la pince homing*/}
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h1>system</h1>
                    </div>
                </div>
            </div>
        </>
    );
}
