import { MongoClient, ServerApiVersion } from "mongodb";

if (!process.env.MONGODB_URI) throw new Error("No mongodb uri");
const uri: string = process.env.MONGODB_URI;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const db = client.db("simply");
export { client, db };
