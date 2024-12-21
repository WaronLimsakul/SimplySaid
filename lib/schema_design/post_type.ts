import { ObjectId } from "mongodb";

type Post = {
  id: null | string | ObjectId;
  object: string;
  owner_id: string | ObjectId;
  tags: string[];
  content: string;
  upvotes: number;
  downvotes: number;
};

export default Post;
