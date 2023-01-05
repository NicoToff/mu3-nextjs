import Head from "next/head";
import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import { Typography } from "@mui/material";
import Navbar from "../components/Navbar";
import { Login } from "../components/Login";

const Home: NextPage = () => {
    const { data: session } = useSession();

    if (!session) {
        return <Login />;
    }

    return (
        <>
            <Head>
                <title>{`Bienvenue à la MU3`}</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Navbar />

            <div className="container">
                <div className="row">
                    <div className="col-12 text-center">
                        <Typography variant="h3">MU3 zone 5 et 3</Typography>
                        <Typography>Bienvenue {session.user?.name}</Typography>
                        <Typography>Sur la navbar vous pouvez aller à l&apos;une des pages suivante :</Typography>
                        <Typography>
                            - Dashboard dans laquel vous verrez certains mots techniques choisis par le technicien
                        </Typography>
                        <Typography>- Panel admin dans laquel vous verez tout les mots techniques</Typography>
                        <Typography>
                            - Système intelligent dans laquel on vous parlera du servodrive pour le système
                            d&apos;avance film de la zone 3
                        </Typography>
                    </div>
                </div>
            </div>
            <div className="text-center">
                <img src="/images/miniusine3.jpg" className="img-thumbnail" />
            </div>
        </>
    );
};

export default Home;
