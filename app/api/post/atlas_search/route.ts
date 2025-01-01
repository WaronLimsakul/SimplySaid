import { db } from "@/lib/mongodb";

const posts_coll = db.collection("posts");

export async function GET(req: Request) {
  const url = new URL(req.url);
  const search_params = url.searchParams;

  if (!search_params.has("q"))
    return new Response("Only test with general query now", { status: 400 });

  const target = search_params.get("q");
  if (!target) return new Response("No search words", { status: 400 });

  const agg = [
    {
      $search: {
        index: "posts_index",
        text: {
          query: target,
          path: {
            wildcard: "*",
          },
        },
      },
    },
    { $limit: 10 },
  ];
  // Must use aggregate, this is counted as a complex query.
  // And .find() don't support Apache lucene.
  const result = posts_coll.aggregate(agg);
  const resultArray = await result.toArray();
  return Response.json(resultArray);
}
