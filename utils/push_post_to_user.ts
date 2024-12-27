import { db } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

const users_coll = db.collection("users");

// we assume that user and post id is already validated and user is already authorized.
export default async function pushPostToUser(
    post_id: ObjectId,
    user_id: ObjectId,
) {
    const push_result = await users_coll.updateOne(
        { _id: user_id },
        { $push: { posts: post_id } },
    );

    // if this operation fails, we need to roll back, so we delete that post.
    if (!push_result.acknowledged || push_result.modifiedCount == 0) {
        await db.collection("posts").deleteOne({ _id: post_id });
        return new Response("Error, fail to push post to user profile", {
            status: 500,
        });
    }

    return Response.json(push_result);
}
