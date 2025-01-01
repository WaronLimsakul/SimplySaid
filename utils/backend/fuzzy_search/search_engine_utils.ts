import { db } from "@/lib/mongodb";
import SearchEngine from "./search_engine";
import { ObjectId } from "mongodb";

const posts_coll = db.collection("posts");
// fuzzy search engine.
let fse: SearchEngine | null = null;

const createSE = async () => {
    const se = new SearchEngine();
    const allPostsCursor = posts_coll.find(
        {},
        { projection: { content: 0, votes: 0 } },
    );
    for await (const post of allPostsCursor) {
        se.addPost(post);
    }
    return se;
};

const getSE = async () => {
    if (!fse) fse = await createSE();
    return fse;
};

const updateSE = async (post_id: ObjectId) => {
    if (!fse) {
        return await getSE();
    }
    const newPost = await posts_coll.findOne({ post_id: post_id });
    if (!newPost) return new Error("No new post found");
    fse.addPost(newPost);
    return fse;
};

export { getSE, updateSE };
