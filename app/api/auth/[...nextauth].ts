import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import dotenv from "dotenv";

dotenv.config();

if (!process.env.GITHUB_CLIENT_ID)
    throw new Error("No Github client id available");
if (!process.env.GITHUB_CLIENT_SECRET)
    throw new Error("No Github client secret available");

export const authOptions = {
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
        }),
    ],
};

export default NextAuth(authOptions);
