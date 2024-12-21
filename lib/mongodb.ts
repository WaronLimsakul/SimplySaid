import { MongoClient, ServerApiVersion } from "mongodb";

if (!process.env.MONGO_URI) throw new Error("No connection string");
const uri: string = process.env.MONGO_URI;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});
const db = client.db("simply");
export { db };
