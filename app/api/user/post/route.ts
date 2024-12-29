import pushPostToUser from "@/utils/backend/push_post_to_user";
import { ObjectId } from "mongodb";

// note that this route is only for testing in development.
// In production, we api/post POST will handle pushing post to user profile by itself.
export async function POST(req: Request) {
  const { post_id, user_id }: { post_id: string; user_id: string } =
    await req.json();
  const res = await pushPostToUser(
    new ObjectId(post_id),
    new ObjectId(user_id),
  );
  return res;
}
