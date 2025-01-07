import { WithId } from "mongodb";
import Post from "./post_type";

type ExtendedPost = Post & WithId<Document>;

export default ExtendedPost;
