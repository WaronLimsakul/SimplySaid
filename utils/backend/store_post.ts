import { NextRequest } from "next/server";
import authorize_session from "./check_authenticate";
import Post from "@/lib/schema_design/post_type";
import { ObjectId } from "mongodb";
import { db } from "@/lib/mongodb";

const posts_coll = db.collection("posts");
const users_coll = db.collection("users");

export async function storePost(req: NextRequest) {
  const authorized_result = await authorize_session(req);
  if (authorized_result instanceof Response) return authorized_result;

  const user_id = authorized_result;

  const { post }: { post: Post } = await req.json();
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
  if (!result.acknowledged)
    return new Response(
      "Internal Server Error, fail to post a post. Please try again.",
      { status: 500 },
    );
  return { post_id: result.insertedId, user_id: new ObjectId(user_id) };
}
