import { db } from "@/lib/mongodb";
import SearchEngine from "./search_engine";
import { ObjectId } from "mongodb";

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
        newEngine.addPost(post);
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
    fuzzySearchEngine.addPost(newPost);
    return fuzzySearchEngine;
};

export { getSearchEngine, updateSearchEngine };
