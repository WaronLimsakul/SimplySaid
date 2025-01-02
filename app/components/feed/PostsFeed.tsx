import React from "react";
import Post from "./Post";
import PostType from "@/lib/schema_design/post_type";

// get post props from parents.
// container = set to max width, mx-auto - make it center
// grid = grid container, grid-cols-12 = declare based 12 system
const PostsFeed = async ({ posts }: { posts: PostType[] }) => {
  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-12 gap-0 md:gap-4">
        <div className="col-span-0 md:col-span-3 " />
        <div className="col-span-12 md:col-span-6 mx-2 md:mx-0">
          {posts.map((post) => (
            <Post key={post._id} post={post} />
          ))}
        </div>
        <div className="col-span-0 md:col-span-3" />
      </div>
    </div>
  );
};

export default PostsFeed;
