import { Badge } from "@/components/ui/badge";
import { CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import ClickablePostOwner from "./ClickablePostOwner";

const PostHeader = ({
  user_id,
  title,
  user_image,
  user_name,
  tags,
  object,
}: {
  title: string;
  user_image: string;
  user_name: string;
  tags: string[];
  object: string;
}) => {
  return (
    <CardHeader className="p-5 pb-3 md:p-5">
      <CardTitle className="text-xl">{title}</CardTitle>
      <ClickablePostOwner
        user_id={user_id}
        user_image={user_image}
        user_name={user_name}
      />
      <div className="flex justify-start gap-1">
        <Badge className="italic">{object}</Badge>
        {tags.map((tag) => (
          <Badge className="" variant="secondary" key={tag}>
            {tag}
          </Badge>
        ))}
      </div>
    </CardHeader>
  );
};

export default PostHeader;
