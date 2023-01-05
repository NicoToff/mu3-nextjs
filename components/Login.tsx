import Head from "next/head";
import { signIn } from "next-auth/react";
import { Typography } from "@mui/material";
import Image from "next/image";

export function Login() {
    return (
        <>
            <Head>
                <title>Connexion MU3</title>
            </Head>

            <div className="container">
                <Typography variant="h2" component="h1">
                    Miniusine 3
                </Typography>
                <Typography>
                    Bienvenue sur notre site web sur les zones 5 et 3 de la miniusine.
                    <br />
                    Les utilisateurs authentifiés peuvent regarder les données reçues en se connectant.
                </Typography>
                <hr className="my-2" />
                <Typography>Veuillez vous connecter en appuyant sur le bouton ci-dessous.</Typography>
                <Typography mb={3}>
                    <a className="btn btn-primary btn-lg" onClick={() => signIn("discord")} role="button">
                        Connexion
                    </a>
                </Typography>
                <div className="text-center">
                    <Image
                        src="/images/technocampus.jpg"
                        className="img-thumbnail"
                        width={1250}
                        height={1250}
                        alt="Photo"
                    />
                </div>
            </div>
        </>
    );
}
