import { db } from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextRequest } from "next/server";

const posts_coll = db.collection("posts");

// can get posts by user_id, post_id, a tag, object, (potentially) title
// (Next.js GET method strip the body out, so we use query params instead.)
export async function GET(req: NextRequest) {
    // create URL object = easy to get params query.
    const url = new URL(req.url);
    const search_params = url.searchParams;
    console.log("search_params:", search_params);
    let filter;
    const tags = search_params.getAll("tags");
    console.log("tags:", tags);
    console.log("typeof tags:", typeof tags);

    // find ONE post by its id, first priority
    if (search_params.has("post_id")) {
        const result = await posts_coll.findOne({
            _id: new ObjectId(search_params.get("post_id")),
        });
        return Response.json(result);
    } else if (search_params.has("object"))
        filter = { object: search_params.get("object") };
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

// post need object, title, tags, content + user_id to ensure user is logged in.
export async function POST(req: Request) {
    // already check if user logged in from client-side.
    const { post, user_id }: { post; user_id: string } = await req.json();
    if (!(post && user_id)) return new Response("Bad request", { status: 400 });
    const {
        object,
        title,
        tags,
        content,
    }: {
        object: string;
        title: string;
        tags: string[];
        content: string;
    } = post;
    if (!(object && title && tags && content))
        return new Response("Bad request, post data not complete", { status: 400 });
    const result = await posts_coll.insertOne({
        object,
        title,
        tags,
        content,
        // [up, down]
        votes: [0, 0],
        user_id,
    });
    return Response.json(result);
}
