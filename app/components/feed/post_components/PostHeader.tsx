import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CircleUser } from "lucide-react";
import React from "react";

const PostHeader = ({
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
    );
};

export default PostHeader;
