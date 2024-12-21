import NextAuth from "next-auth";
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

// create every route handlers function but passing options to NextAuth()
export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: MongoDBAdapter(client, mongoAdapter_opts),
  providers: [GitHub, Google],
});
