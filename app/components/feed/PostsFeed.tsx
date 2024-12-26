import React from "react";
import Post from "./Post";
import postt from "@/lib/schema_design/post_type";

// get post props from parents.
// container = set to max width, mx-auto - make it center
// grid = grid container, grid-cols-12 = declare based 12 systems
const PostsFeed = async ({ posts }: { posts: postt[] }) => {
  console.log(posts[0]);
  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-3 " />
        <div className="col-span-6">
          {posts.map((post) => (
            <Post key={post._id} post={post} />
          ))}
        </div>
        <div className="col-span-3" />
      </div>
    </div>
  );
};

export default PostsFeed;