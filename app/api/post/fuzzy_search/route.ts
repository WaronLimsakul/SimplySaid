import { db } from "@/lib/mongodb";
import { getSearchEngine } from "@/utils/backend/fuzzy_search/search_engine_utils";
import { Document, ObjectId, WithId } from "mongodb";
import { NextRequest } from "next/server";

const posts_coll = db.collection("posts");

export async function GET(req: NextRequest) {
    const url = new URL(req.url);
    const search_params = url.searchParams;

    if (!search_params.has("q"))
        return new Response("Only test with general query now", { status: 400 });

    const target = search_params.get("q");
    if (!target) return new Response("No search words", { status: 400 });

    const fuzzySearchEngine = await getSearchEngine();

    const targetPostIDs = fuzzySearchEngine.search(target);
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
