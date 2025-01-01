import PostsFeed from "@/app/components/feed/PostsFeed";
import NoPostResult from "@/app/components/searched_posts/NoPostResult";
import postt from "@/lib/schema_design/post_type";
import { getTagsQuery } from "@/utils/frontend/get_tags_query";

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  // no usePathName in server side, so we have to extract filter query by ourselves.
  let fetched_posts: postt[] | null = null;
  const { post_id, fuzzy, atlas, tags, user_id, object } = await searchParams;

  if (post_id) {
    const result = await fetch(
      `${process.env.SERVER_URI}/post?post_id=${post_id}`,
    );
    if (result.ok) fetched_posts = [await result.json()];
  } else if (fuzzy) {
    const result = await fetch(
      `${process.env.SERVER_URI}/post/fuzzy_search?q=${fuzzy}`,
    );
    if (result.ok) fetched_posts = await result.json();
  } else if (atlas) {
    const result = await fetch(
      `${process.env.SERVER_URI}/post/atlas_search?q=${atlas}`,
    );
    if (result.ok) fetched_posts = await result.json();
  } else if (object) {
    const result = await fetch(
      `${process.env.SERVER_URI}/post?object=${object}`,
    );
    if (result.ok) fetched_posts = await result.json();
  } else if (tags) {
    let tags_in_queries: string;
    // in case we can query more than one tags (string[])
    if (Array.isArray(tags)) tags_in_queries = getTagsQuery(tags);
    // normal case (string)
    else tags_in_queries = `?tags=${tags}`;
    const result = await fetch(
      `${process.env.SERVER_URI}/post${tags_in_queries}`,
    );
    if (result.ok) fetched_posts = await result.json();
  } else if (user_id) {
    const result = await fetch(
      `${process.env.SERVER_URI}/post?user_id=${user_id}`,
    );
    if (result.ok) fetched_posts = await result.json();
  } else {
    fetched_posts = null;
  }

  // **empty array is truthy**

  return (
    <div>
      {!fetched_posts || fetched_posts.length == 0 ? (
        <NoPostResult />
      ) : (
        <PostsFeed posts={fetched_posts} />
      )}
    </div>
  );
};

export default page;
