import { Avatar, AvatarImage } from "@/components/ui/avatar";
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
import { AvatarFallback } from "@radix-ui/react-avatar";
import { CircleUser, ExternalLink, ThumbsDown, ThumbsUp } from "lucide-react";
import React from "react";

const Post = ({ post }: { post: postt }) => {
    const { _id, title, content, object, tags, votes, user_data } = post;
    const user_name = user_data.name;
    const user_image = user_data.image;

    return (
        <div className="my-4">
            <Card className="w-auto">
                <CardHeader>
                    <CardTitle className="text-xl">{title}</CardTitle>
                    <CardDescription className="flex justify-start content-center gap-2">
                        <Avatar className="h-7 w-auto">
                            <AvatarImage src={user_image} />
                            <AvatarFallback>
                                <CircleUser />
                            </AvatarFallback>
                        </Avatar>
                        <p className="my-auto">{user_name}</p>
                    </CardDescription>
                    <div className="flex justify-start gap-1">
                        <Badge className="italic">{object}</Badge>
                        {tags.map((tag) => (
                            <Badge className="" variant="secondary" key={tag}>
                                {tag}
                            </Badge>
                        ))}
                    </div>
                </CardHeader>
                <CardContent className="pb-2">
                    <p>{content}</p>
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
