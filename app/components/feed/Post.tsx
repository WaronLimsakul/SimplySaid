import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import postt from "@/lib/schema_design/post_type";
import { ExternalLink, ThumbsDown, ThumbsUp } from "lucide-react";
import React from "react";

const Post = ({ post }: { post: postt }) => {
    return (
        <div className="my-4">
            <Card className="w-auto">
                <CardHeader>
                    <CardTitle>{post.title}</CardTitle>
                    <CardDescription>{post.user_id}</CardDescription>
                    <div className="flex justify-start gap-1">
                        {post.tags.map((tag) => (
                            <Badge className="italic" variant="secondary" key={tag}>
                                {tag}
                            </Badge>
                        ))}
                    </div>
                </CardHeader>
                <CardContent className="pb-2">
                    <p>{post.content}</p>
                </CardContent>
                <CardFooter className="flex p-4 justify-start gap-1">
                    <Button variant="ghost" size="icon" className="rounded-full">
                        <ThumbsUp />
                    </Button>
                    <Button variant="ghost" size="icon" className="rounded-full">
                        <ThumbsDown />
                    </Button>
                    <Button variant="ghost" size="icon" className="rounded-full">
                        <ExternalLink />
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
};

export default Post;
