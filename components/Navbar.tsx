import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

const Navbar = () => {
    const { data: session } = useSession();
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" href="/">
                    Miniusine 3
                </Link>
                <ul className="navbar-nav me-auto">
                    <li className="nav-item">
                        <Link className="nav-link" href="/">
                            Accueil
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" href="/dashboard">
                            Dashboard
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" href="/mqtt">
                            Admin panel
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" href="/system">
                            Système intelligent
                        </Link>
                    </li>
                    <li className="nav-item ms-5 ">
                        <button className="btn btn-secondary" onClick={() => signOut()}>
                            Déconnexion
                        </button>
                    </li>
                    {session && session.user && (
                        <li className="nav-item small">
                            <span className="nav-link">Connecté en tant que : {session.user.name}</span>
                        </li>
                    )}
                </ul>
            </div>
        </nav>
    );
};
export default Navbar;
