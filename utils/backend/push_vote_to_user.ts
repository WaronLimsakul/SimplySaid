import { db } from "@/lib/mongodb";
import { ObjectId, PushOperator } from "mongodb";

const users_coll = db.collection("users");
const posts_coll = db.collection("posts");

// if pushing not success, we need to roll back
// since we already push a vote to a post
export async function pushVoteToUser(
    user_id: string,
    post_id: string,
    val: number,
) {
    // $push check if there is a field, if not it insert that field with value.
    const result = await users_coll.updateOne(
        {
            _id: new ObjectId(user_id),
        },
        { $push: { votes: { post_id, val } } as PushOperator<Document> },
    );

    if (!result.acknowledged || result.modifiedCount == 0) {
        // roll back
        if (val == 1)
            await posts_coll.updateOne(
                { _id: new ObjectId(post_id) },
                { $inc: { "votes.0": -1 } },
            );
        else
            await posts_coll.updateOne(
                { _id: new ObjectId(post_id) },
                { $inc: { "votes.1": -1 } },
            );
        return false;
    }

    return result;
}
