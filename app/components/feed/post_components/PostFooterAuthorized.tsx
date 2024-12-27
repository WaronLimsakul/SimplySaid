"use client";

import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowBigDown, ArrowBigUp, ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";

const PostFooterAuthorized = ({ votes }: { votes: [number, number] }) => {
  const [vote, setVote] = useState(0); // 3 states (0, 1, -1) = (nothing, upvote, downvote)

  useEffect(() => {
    const upVote = async () => {};
    const downVote = async () => {};
    const unVote = async () => {};
  }, [vote]);

  const handleLike = () => {
    setVote(vote == 1 ? 0 : 1);
  };
  const handleDisLike = () => {
    setVote(vote == -1 ? 0 : -1);
  };
  // I think shadcn set button that contain icon to default w-4 and h-4. So
  // I did [&_svg] to override it.
  return (
    <CardFooter className="flex p-4 justify-start gap-1">
      <div className="flex h-auto border items-center rounded-full space-x-1 text-sm px-1">
        <Button
          variant="ghost"
          size="icon"
          onClick={handleLike}
          className="rounded-full [&_svg]:h-auto [&_svg]:w-auto"
        >
          {vote > 0 ? (
            <ArrowBigUp strokeWidth={1.5} color="#4caf50" fill="#4caf50" />
          ) : (
            <ArrowBigUp strokeWidth={1.5} />
          )}
        </Button>
        <p className="my-auto pr-2">{votes[0]}</p>
        <Separator orientation="vertical" className="h-6 mx-1" />
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full [&_svg]:h-auto [&_svg]:w-auto"
          onClick={handleDisLike}
        >
          {vote < 0 ? (
            <ArrowBigDown strokeWidth={1.5} color="#F44336" fill="#F44336" />
          ) : (
            <ArrowBigDown strokeWidth={1.5} />
          )}
        </Button>
        <p className="my-auto pr-2">{votes[1]}</p>
      </div>
      <Button variant="ghost" size="icon" className="rounded-full">
        <ExternalLink />
      </Button>
    </CardFooter>
  );
};

export default PostFooterAuthorized;
