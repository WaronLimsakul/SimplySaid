import { Card, CardContent } from "@/components/ui/card";
import type Post from "@/lib/schema_design/post_type";
import React from "react";
import PostHeader from "./post_components/PostHeader";
import PostFooterAuthorized from "./post_components/PostFooterAuthorized";
import PostFooterGuest from "./post_components/PostFooterGuest";
import { getSession } from "@/utils/frontend/get_session";
import { Separator } from "@/components/ui/separator";
import { MdParser } from "@/utils/frontend/md_parser/MdParser";

// as long as I don't use client rendering, I can declare async to any component.
const Post = async ({ post }: { post: Post }) => {
  const { _id, title, content, object, tags, votes, user_data } = post;
  // this user implies the writer of a post
  const user_name = user_data.name;
  const user_image = user_data.image;
  const user_id = user_data.user_id;
  const mdParser = new MdParser();

  // already cached
  const session = await getSession();
  let init_vote_val = 0;
  if (session && session.user && "votes" in session.user) {
    const found_user_vote = session.user.votes.find(
      (vote: { post_id: string; val: 1 | -1 }) => vote.post_id == _id,
    );
    if (found_user_vote) init_vote_val = found_user_vote.val;
  }
  // note that
  // 1. separator's container must have defined height (at least auto)
  // ; otherwise, the separator will not appear.
  // 2. PostFooterGuest is server-side rendered since guest don't need any interaction.
  return (
    <div className="my-4">
      <Card className="w-auto h-auto">
        <PostHeader
          user_id={user_id}
          title={title}
          user_image={user_image}
          user_name={user_name}
          object={object}
          tags={tags}
        />
        <Separator orientation="horizontal" className="w-[93%]  mx-auto" />
        <CardContent className="pt-3 pb-2">
          {content && (
            <div
              dangerouslySetInnerHTML={{ __html: mdParser.render(content) }}
            />
          )}
        </CardContent>
        {session ? (
          <PostFooterAuthorized
            votes={votes}
            init_vote_val={init_vote_val}
            post_id={_id}
          />
        ) : (
          <PostFooterGuest votes={votes} post_id={_id} />
        )}
      </Card>
    </div>
  );
};

export default Post;
