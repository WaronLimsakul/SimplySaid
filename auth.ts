import NextAuth from "next-auth";
import type { Provider } from "next-auth/providers";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { MongoDBAdapter, MongoDBAdapterOptions } from "@auth/mongodb-adapter";
import { client } from "./lib/mongodb";

// if I don't set the options, adapter will create another db name test in my cluster
const mongoAdapter_opts: MongoDBAdapterOptions = {
    collections: {
        Accounts: "accounts",
        Sessions: "sessions",
        Users: "users",
    },
    databaseName: "simply",
};

const providers: Provider[] = [GitHub, Google];

export const providerMap = providers.map((provider) => {
    if (typeof provider == "function") {
        const providerData = provider();
        return { id: providerData.id, name: provider.name };
    } else return { id: provider.id, name: provider.name };
});

// create every route handlers function but passing options to NextAuth().
// If user sign in with one provider --> They can't sign in with another provider with the same email.
export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: MongoDBAdapter(client, mongoAdapter_opts),
    providers,
    pages: {
        signIn: "/signin",
    },
});
