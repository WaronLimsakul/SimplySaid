import { db } from "@/lib/mongodb";
import postt from "@/lib/schema_design/post_type";
import authorize_session from "@/utils/check_authenticate";
import { ObjectId } from "mongodb";
import { NextRequest } from "next/server";

const posts_coll = db.collection("posts");
const users_coll = db.collection("users");

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
        filter = { user_id: search_params.get("user_id") };
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
export async function POST(req: NextRequest) {
    const authorized_result = await authorize_session(req);
    if (authorized_result instanceof Response) return authorized_result;

    const user_id = authorized_result;

    const { post }: { post: postt } = await req.json();
    if (!post) return new Response("Bad request", { status: 400 });

    if (!(post.object && post.title && post.tags && post.content))
        return new Response("Bad request, post data not complete", { status: 400 });

    const user_data = await users_coll.findOne(
        { _id: new ObjectId(user_id) },
        { projection: { _id: 1, name: 1, image: 1 } },
    );

    if (!user_data) return new Response("Internal server error", { status: 500 });
    const { _id, name, image } = user_data;

    const result = await posts_coll.insertOne({
        object: post.object,
        title: post.title,
        tags: post.tags,
        content: post.content,
        // [up, down]
        votes: [0, 0],
        user_data: {
            user_id: _id,
            name: name,
            image: image,
        },
    });
    return Response.json(result);
}
