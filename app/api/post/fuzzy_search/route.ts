import { db } from "@/lib/mongodb";
import SearchEngine from "@/utils/backend/fuzzy_search/search_engine";
import { Document, ObjectId, WithId } from "mongodb";
import { NextRequest } from "next/server";

const posts_coll = db.collection("posts");

export async function GET(req: NextRequest) {
    const url = new URL(req.url);
    const search_params = url.searchParams;

    if (!search_params.has("general"))
        return new Response("Only test with general now", { status: 400 });

    const target = search_params.get("general");
    if (!target) return new Response("No search words", { status: 400 });

    const generalSE = new SearchEngine();
    const post_preview_cursor = posts_coll
        .find({}, { projection: { content: 0, votes: 0 } })
        .limit(100);
    for await (const post_preview of post_preview_cursor) {
        generalSE.addPost(post_preview);
    }

    const targetPostIDs = generalSE.search(target);
    console.log("target post ids: ", targetPostIDs);
    const fetchedPostsCursor = posts_coll
        // $in doesn't care order.
        .find({ _id: { $in: targetPostIDs.map((id) => new ObjectId(id)) } });

    // hash map has O(1) finding
    const fetchedPostIndex: { [post_id: string]: WithId<Document> } = {};
    for await (const unsortedPost of fetchedPostsCursor)
        fetchedPostIndex[String(unsortedPost._id)] = unsortedPost;
    const sortedTargetPosts = targetPostIDs.map(
        (targetID) => fetchedPostIndex[targetID],
    );

    return Response.json(sortedTargetPosts);
}
