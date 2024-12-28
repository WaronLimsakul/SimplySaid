import authorize_session from "@/utils/backend/check_authenticate";
import { unVoteFromPost } from "@/utils/backend/unvote_from_post";
import { deleteVoteFromUser } from "@/utils/backend/delete_vote_from_user";
import { putVoteInPost } from "@/utils/backend/push_vote_in_post";
import { pushVoteToUser } from "@/utils/backend/push_vote_to_user";
import { NextRequest } from "next/server";

// only for upvote and downvote post
// do 3 things
// 1. authorize user
// 2. increment vote in post db
// 3. push vote in user db.
export async function POST(req: NextRequest) {
  const authen_result = await authorize_session(req);
  if (authen_result instanceof Response) return authen_result;

  const user_id = authen_result;
  // val: 1 for upvote, -1 for downvote
  const { post_id, val }: { post_id: string; val: number } = await req.json();
  if (!(post_id && val ** 2 == 1))
    return new Response("Bad request", { status: 401 });

  const pushVoteInPostResult = await putVoteInPost(val, post_id);
  if (
    !pushVoteInPostResult.acknowledged ||
    pushVoteInPostResult.modifiedCount == 0
  )
    return new Response("Fail to vote a post", { status: 500 });

  const pushVoteToUserResult = await pushVoteToUser(user_id, post_id, val);
  if (!pushVoteToUserResult)
    return new Response("Fail to put vote to user", { status: 500 });

  return new Response("Voting success", { status: 200 });
}

// do 3 things
// 1. Authorize user
// 2. Delete a vote from user db
// 3. Decrement a vote from post db
export async function DELETE(req: NextRequest) {
  const authen_result = await authorize_session(req);
  if (authen_result instanceof Response) return authen_result;

  const user_id = authen_result;

  // I think we can get what vote user previously have by unvote from user first
  const { post_id }: { post_id: string } = await req.json();
  if (!post_id) return new Response("Bad request", { status: 401 });

  const delVoteFromUserRes = await deleteVoteFromUser(user_id, post_id);
  if (delVoteFromUserRes instanceof Error)
    return new Response(delVoteFromUserRes.message, { status: 500 });

  const prev_val = delVoteFromUserRes;

  const unVoteFromUser = await unVoteFromPost(post_id, prev_val);
  if (!unVoteFromUser)
    return new Response("Fail to unvote post", { status: 500 });

  return new Response("Unvoting success", { status: 200 });
}
