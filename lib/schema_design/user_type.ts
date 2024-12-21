import { ObjectId } from "mongodb";

type User = {
  id: null | string | ObjectId;
  name: string;
  email: string;
  image: string;
  post_ids: string[] | ObjectId[] | null;
  post_amount: number;
  votes: { post_id: string | ObjectId[]; val: 1 | -1 }[] | null;
};

export default User;
