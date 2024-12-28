import { Card, CardContent } from "@/components/ui/card";
import postt from "@/lib/schema_design/post_type";
import React from "react";
import PostHeader from "./post_components/PostHeader";
import PostFooterAuthorized from "./post_components/PostFooterAuthorized";
import PostFooterGuest from "./post_components/PostFooterGuest";
import { getSession } from "@/utils/frontend/get_session";

// as long as I don't use client rendering, I can declare async to any component.
const Post = async ({ post }: { post: postt }) => {
  const { _id, title, content, object, tags, votes, user_data } = post;
  const user_name = user_data.name;
  const user_image = user_data.image;
  const session = await getSession();

  // note that
  // 1. separator's container must have defined height (at least auto)
  // ; otherwise, the separator will not appear.
  // 2. PostFooterGuest is server-side rendered since guest don't need any interaction.
  return (
    <div className="my-4">
      <Card className="w-auto">
        <PostHeader
          title={title}
          user_image={user_image}
          user_name={user_name}
          object={object}
          tags={tags}
        />
        <CardContent className="pb-2">
          <p>{content}</p>
        </CardContent>
        {session ? (
          <PostFooterAuthorized votes={votes} post_id={_id} />
        ) : (
          <PostFooterGuest votes={votes} />
        )}
      </Card>
    </div>
  );
};

export default Post;
