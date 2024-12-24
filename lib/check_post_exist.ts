import { ObjectId } from "mongodb";
import { db } from "./mongodb";

const posts_coll = db.collection("posts");

export default async function check_post_exists(post_id: string) {
    const result = await posts_coll.findOne({ _id: new ObjectId(post_id) });
    if (!result) return false;
    return true;
}
