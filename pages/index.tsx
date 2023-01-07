import { useSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import { type NextPage } from "next";
import { Typography } from "@mui/material";

const Home: NextPage = () => {
    const { data: session } = useSession();
    return (
        <>
            <Head>
                <title>{`Bienvenue à la MU3`}</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="container text-center">
                <Typography variant="h2" component="h1" mt={3}>
                    MU3 zone 5 et 3
                </Typography>
                {session && session.user && (
                    <Typography variant="overline" fontSize={24} gutterBottom>
                        Bienvenue, {session.user.name} !
                    </Typography>
                )}
                <Typography variant="body1">
                    Sur la navbar vous pouvez aller à l&apos;une des pages suivante :
                </Typography>
                <Typography variant="body1">
                    - Dashboard dans laquel vous verrez certains mots techniques choisis par le technicien
                </Typography>
                <Typography variant="body1">- Panel admin dans laquel vous verez tout les mots techniques</Typography>
                <Typography variant="body1">
                    - Système intelligent dans laquel on vous parlera du servodrive pour le système d&apos;avance film
                    de la zone 3
                </Typography>
            </div>
            <div className="text-center mt-3">
                <Image
                    src="/images/miniusine3.jpg"
                    className="img-thumbnail"
                    width={1200}
                    height={500}
                    alt="MU3 photo"
                    priority
                />
            </div>
        </>
    );
};

export default Home;
