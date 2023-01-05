import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import Head from "next/head";
import Script from "next/script";

const MyApp: AppType<{ session: Session | null }> = ({ Component, pageProps: { session, ...pageProps } }) => {
    return (
        <>
            <Head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width= device-width, inital-scale=1, shrink-to-fit=no" />
                <link rel="stylesheet" href="https://bootswatch.com/5/darkly/bootstrap.css" />
            </Head>

            <SessionProvider session={session}>
                <Component {...pageProps} />
            </SessionProvider>

            <Script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" />
            <Script src="https://cdn.jsdelivr.net/npm/popper.js@1.14.3/dist/umd/popper.min.js" />
            <Script src="https://cdn.jsdelivr.net/npm/bootstrap@4.1.3/dist/js/bootstrap.min.js" />
        </>
    );
};

export default MyApp;
