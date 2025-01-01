import check_post_exists from "@/utils/backend/check_post_exist";
import { db } from "@/lib/mongodb";
import authorize_session from "@/utils/backend/check_authenticate";
import { ObjectId } from "mongodb";
import { NextRequest } from "next/server";

const users_coll = db.collection("users");

export async function POST(req: NextRequest) {
    const authorized_result = await authorize_session(req);
    if (authorized_result instanceof Response) return authorized_result;

    const user_id = authorized_result;

    const { post_id, val }: { post_id: string; val: number } = await req.json();
    if (!(post_id && val))
        return new Response("No post id or value from request", { status: 400 });

    const check_post_res = await check_post_exists(post_id);
    if (!check_post_res) return new Response("No post exists", { status: 400 });

    // $push check if there is a field, if not it insert that field with value.
    const result = await users_coll.updateOne(
        {
            _id: new ObjectId(user_id),
        },
        { $push: { votes: { post_id, val } } },
    );

    return Response.json(result);
}
