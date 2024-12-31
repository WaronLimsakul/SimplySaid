import { db } from "@/lib/mongodb";
import SearchEngine from "@/utils/backend/fuzzy_search/search_engine";
import { NextRequest } from "next/server";

const posts_coll = db.collection("posts");

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const search_params = url.searchParams;

  if (!search_params.has("fuzzy"))
    return new Response("Only test with general now", { status: 400 });

  const target = search_params.get("fuzzy");
  if (!target) return new Response("No search words", { status: 400 });

  // assume only general
  const generalSE = new SearchEngine();
  const post_preview_cursor = posts_coll.find().limit(100);
  for await (const post_preview of post_preview_cursor) {
    generalSE.addPost(post_preview);
  }

  const targetPostIDs = generalSE.search(target);

  // let filter, target;

  //if (search_params.has("object")) {
  //  filter = "object";
  //  target = search_params.get("object")?.toLowerCase;
  //} else if (search_params.has("title")) {
  //  filter = "title";
  //  target = search_params.get("title")?.toLowerCase;
  //} else if (search_params.has("user")) {
  //  filter = "user";
  //  target = search_params.get("user")?.toLowerCase;
  //} else if (search_params.has("tags")) {
  //  filter = "tags";
  //  target = search_params.get("tags")?.toLowerCase;
  //} else {
  //  filter = null;
  //}
}
