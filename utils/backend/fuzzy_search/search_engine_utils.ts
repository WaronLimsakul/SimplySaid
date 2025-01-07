import { db } from "@/lib/mongodb";
import SearchEngine from "./search_engine";
import { ObjectId, WithId } from "mongodb";
import Post from "@/lib/schema_design/post_type";
import ExtendedPost from "@/lib/schema_design/ExtendedPost";

const posts_coll = db.collection("posts");
// fuzzy search engine.
let fuzzySearchEngine: SearchEngine | null = null;

const createSearchEngine = async () => {
    const newEngine = new SearchEngine();
    const allPostsCursor = posts_coll.find(
        {},
        { projection: { content: 0, votes: 0 } },
    );
    for await (const post of allPostsCursor) {
        type ExtendedPost = Post & WithId<Document>;
        newEngine.addPost(post as ExtendedPost);
    }
    return newEngine;
};

const getSearchEngine = async () => {
    if (!fuzzySearchEngine) fuzzySearchEngine = await createSearchEngine();
    return fuzzySearchEngine;
};

const updateSearchEngine = async (post_id: ObjectId) => {
    if (!fuzzySearchEngine) {
        return await getSearchEngine();
    }
    const newPost = await posts_coll.findOne({ post_id: post_id });
    if (!newPost) return new Error("No new post found");
    fuzzySearchEngine.addPost(newPost as ExtendedPost);
    return fuzzySearchEngine;
};

export { getSearchEngine, updateSearchEngine };
