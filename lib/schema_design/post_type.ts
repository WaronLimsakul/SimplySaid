// from post type
type postt = {
  _id: string;
  object: string;
  title: string;
  tags: string[];
  content?: string;
  votes: [number, number];
  user_data: {
    user_id: string;
    name: string;
    image: string;
  };
};

export default postt;
