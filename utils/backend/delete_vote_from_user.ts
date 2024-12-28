import { db } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

const users_coll = db.collection("users");

// also return the removed vote value.
export async function deleteVoteFromUser(
  user_id: string,
  post_id: string,
): Promise<number | Error> {
  const result = await users_coll.findOneAndUpdate(
    { _id: new ObjectId(user_id) },
    { $pull: { votes: { post_id: post_id } } },
    { returnDocument: "before", projection: { votes: 1 } },
  );
  if (!result.value) return new Error("Fail finding target post");

  const removed_vote = result.value.votes.find(
    (vote: { post_id: string; val: number }) => vote.post_id == post_id,
  );

  if (!removed_vote) return new Error("Fail getting previous vote value");

  return removed_vote.val;
}
