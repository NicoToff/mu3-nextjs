import NextAuth from "next-auth";
import DiscordProvider from "next-auth/providers/discord";

export default NextAuth({
    // Configure one or more authentication providers
    providers: [
        DiscordProvider({
            clientId: process.env.DISCORD_ID as string,
            clientSecret: process.env.DISCORD_SECRET as string,
        }),
        // ...add more providers here
    ],
    callbacks: {
        session({ session, token, user }) {
            return session; // The return type will match the one returned in `useSession()`
        },
    },
});
