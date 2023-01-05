import { signOut } from "next-auth/react";
import Link from "next/link";

const Navbar = () => {
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
                    <li className="nav-item">
                        <button className="btn btn-secondary" onClick={() => signOut()}>
                            Déconnexion
                        </button>
                    </li>
                </ul>
            </div>
        </nav>
    );
};
export default Navbar;
