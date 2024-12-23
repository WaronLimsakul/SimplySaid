import { db } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

const posts_coll = db.collection("posts");
// only for upvote and downvote post
export async function PUT(req: Request) {
    // val: 1 for upvote, -1 for downvote
    const { post_id, val }: { post_id: string; val: number } = await req.json();
    if (!(post_id && val)) return new Response("Bad request", { status: 401 });

    let result;
    if (val > 0) {
        result = await posts_coll.updateOne(
            { _id: new ObjectId(post_id) },
            { $inc: { "votes.0": 1 } },
        );
    } else {
        result = await posts_coll.updateOne(
            { _id: new ObjectId(post_id) },
            { $inc: { "votes.1": 1 } },
        );
    }
    return Response.json(result);
}
