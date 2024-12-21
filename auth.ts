import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";

// create every route handlers function but passing options to NextAuth()
export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [GitHub],
});
