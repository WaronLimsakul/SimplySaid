// from post type
type postt = {
  _id: string;
  object: string;
  title: string;
  tags: string[];
  content: string;
  votes: [number, number];
  user_id: string;
};

export default postt;
