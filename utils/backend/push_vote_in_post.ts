import { db } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

const posts_coll = db.collection("posts");

export async function putVoteInPost(val: number, post_id: string) {
  let result;

  if (val == 1) {
    result = await posts_coll.updateOne(
      { _id: new ObjectId(post_id) },
      { $inc: { "votes.0": 1 } },
    );
    // guarantee -1 since we already check that
  } else {
    result = await posts_coll.updateOne(
      { _id: new ObjectId(post_id) },
      { $inc: { "votes.1": 1 } },
    );
  }

  // need to put vote on user profile too.
  return result;
}
