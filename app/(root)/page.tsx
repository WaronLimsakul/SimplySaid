import PostsFeed from "../components/feed/PostsFeed";

export default async function Page() {
  // this one is the first fetching posts, I want this to use SSR.
  const posts_result = await fetch(`${process.env.SERVER_URI}/post`, {
    method: "GET",
    cache: "force-cache", // don't even know I will use it but I'll cache here.
  });
  const posts = await posts_result.json();
  return (
    <div className="m-5">
      <PostsFeed posts={posts} />
    </div>
  );
}
