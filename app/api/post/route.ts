import { db } from "@/lib/mongodb";
import { updateSearchEngine } from "@/utils/backend/fuzzy_search/search_engine_utils";
import pushPostToUser from "@/utils/backend/push_post_to_user";
import { storePost } from "@/utils/backend/store_post";
import { ObjectId } from "mongodb";
import { NextRequest } from "next/server";

const posts_coll = db.collection("posts");

// can get posts by user_id, post_id, tags, object.
// (Next.js GET method strip the body out, so we use query params instead.)
// If no query params, fetch from top.
export async function GET(req: NextRequest) {
    // create URL object = easy to get params query.
    const url = new URL(req.url);
    const search_params = url.searchParams;
    const tags = search_params.getAll("tags");

    let filter;
    // if there is no query params, search randomly
    if (!url.search) {
        filter = {};
    }
    // find ONE post by its id, first priority
    else if (search_params.has("post_id")) {
        const result = await posts_coll.findOne({
            _id: new ObjectId(search_params.get("post_id")),
        });
        return Response.json(result);
        // next priority is the object.
    } else if (search_params.has("object"))
        filter = { object: search_params.get("object") };
    // by user
    else if (search_params.has("user_id"))
        filter = { "user_data.user_id": search_params.get("user_id") };
    // just contain all tags we want, don't care other tags or order.
    else if (search_params.has("tags")) filter = { tags: { $all: tags } };
    else {
        return new Response(
            "Can't search by anything other than post id, user id, an object, and tags",
            { status: 400 },
        );
    }

    const result = await posts_coll.find(filter).toArray();

    return Response.json(result);
}

// post need object, title, tags, content
// we also need to push post id into user.
export async function POST(req: NextRequest) {
    const posting_result = await storePost(req);
    // Response means error here.
    if (posting_result instanceof Response) return posting_result;

    const { post_id, user_id } = posting_result;
    const pushing_post_result = await pushPostToUser(post_id, user_id);
    if (!pushing_post_result.ok) return pushing_post_result;

    const update_se_result = await updateSearchEngine(post_id);
    if (update_se_result instanceof Error)
        return new Response(update_se_result.message, { status: 500 });

    return new Response("Posting success", { status: 201 });
}
