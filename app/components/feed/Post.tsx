import { Card, CardContent } from "@/components/ui/card";
import postt from "@/lib/schema_design/post_type";
import React from "react";
import PostFooter from "./post_components/PostFooter";
import PostHeader from "./post_components/PostHeader";

const Post = ({ post }: { post: postt }) => {
    const { _id, title, content, object, tags, votes, user_data } = post;
    const user_name = user_data.name;
    const user_image = user_data.image;

    // note that separator's container must have defined height (at least auto)
    // ; otherwise, the separator will not appear.
    return (
        <div className="my-4">
            <Card className="w-auto">
                <PostHeader
                    title={title}
                    user_image={user_image}
                    user_name={user_name}
                    object={object}
                    tags={tags}
                />
                <CardContent className="pb-2">
                    <p>{content}</p>
                </CardContent>
                <PostFooter votes={votes} />
            </Card>
        </div>
    );
};

export default Post;
