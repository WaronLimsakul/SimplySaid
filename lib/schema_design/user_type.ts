import { ObjectId } from "mongodb";

// from user type
type usert = {
  id: null | string | ObjectId;
  name: string;
  email: string;
  image: string;
  votes?: { post_id: string | ObjectId[]; val: 1 | -1 }[];
  posts?: ObjectId[] | string[];
};
// note that posts is objectId[] in the schema but when fetched, from db -> server -> client
// It changes to string[].

export default usert;
