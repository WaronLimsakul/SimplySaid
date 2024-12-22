import { ObjectId } from "mongodb";

// from post type
type postt = {
  id: null | string | ObjectId;
  object: string;
  owner_id: string | ObjectId;
  tags: string[];
  content: string;
  upvotes: number;
  downvotes: number;
};

export default postt;
