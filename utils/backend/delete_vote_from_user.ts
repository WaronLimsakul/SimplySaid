import { db } from "@/lib/mongodb";
import { ObjectId, UpdateFilter } from "mongodb";

const users_coll = db.collection("users");

// also return the removed vote value.
export async function deleteVoteFromUser(
    user_id: string,
    post_id: string,
): Promise<number | Error> {
    // this one return the found document of null
    const result = await users_coll.findOneAndUpdate(
        { _id: new ObjectId(user_id) },
        { $pull: { votes: { post_id } } as UpdateFilter<Document> },
        { returnDocument: "before", projection: { votes: 1 } },
    );
    if (!result) return new Error("Fail finding target post");

    const removed_vote = result.votes.find(
        (vote: { post_id: string; val: number }) => vote.post_id == post_id,
    );

    if (!removed_vote) return new Error("Fail getting previous vote value");

    return removed_vote.val;
}
