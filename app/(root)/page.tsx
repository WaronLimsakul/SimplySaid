import PostsFeed from "../components/feed/PostsFeed";

// If this don't use any dynamic parameter; however, I want it to fetch new posts everytime.
export const dynamic = "force-dynamic";

export default async function Page() {
  // this one is the first fetching posts, I want this to use SSR.
  const posts_result = await fetch(`${process.env.SERVER_URI}/post`, {
    method: "GET",
    // using force-cache will cache data across many
    // incoming server requests That's not ideal for posts fetching.
    // Actually, no-store is default.
    cache: "no-store",
  });
  const posts = await posts_result.json();
  return (
    <div className="mt-5">
      <PostsFeed posts={posts} />
    </div>
  );
}
