import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ExternalLink, ThumbsDown, ThumbsUp } from "lucide-react";
import React from "react";

const PostFooter = ({ votes }: { votes: [number, number] }) => {
    return (
        <CardFooter className="flex p-4 justify-start gap-1">
            <div className="flex h-auto border items-center rounded-full space-x-1 text-sm px-1">
                <Button variant="ghost" size="icon" className="rounded-full">
                    <ThumbsUp />
                </Button>
                <p className="my-auto pr-2">{votes[0]}</p>
                <Separator orientation="vertical" className="h-6 mx-1" />
                <Button variant="ghost" size="icon" className="rounded-full">
                    <ThumbsDown />
                </Button>
                <p className="my-auto pr-2">{votes[1]}</p>
            </div>
            <Button variant="ghost" size="icon" className="rounded-full">
                <ExternalLink />
            </Button>
        </CardFooter>
    );
};

export default PostFooter;
