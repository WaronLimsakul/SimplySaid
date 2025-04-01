import { db } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

const posts_coll = db.collection("posts");

export async function unVoteFromPost(post_id: string, prev_val: number) {
  let result;

  if (prev_val == 1)
    result = await posts_coll.updateOne(
      { _id: new ObjectId(post_id) },
      { $inc: { "votes.0": -1 } },
    );
  else
    result = await posts_coll.updateOne(
      { _id: new ObjectId(post_id) },
      { $inc: { "votes.1": 1 } },
    );

  if (!result.acknowledged || result.modifiedCount == 0) return false;
  return result;
}
