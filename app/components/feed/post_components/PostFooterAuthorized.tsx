"use client";

import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowBigDown, ArrowBigUp } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import ShareButton from "./ShareButton";

const PostFooterAuthorized = ({
  votes,
  init_vote_val,
  post_id,
}: {
  votes: [number, number];
  init_vote_val: number;
  post_id: string;
}) => {
  const [vote, setVote] = useState(init_vote_val); // 3 states (0, 1, -1) = (nothing, upvote, downvote)
  const [upVoteNum, setUpVoteNum] = useState(votes[0]);
  const [downVoteNum, setDownVoteNum] = useState(votes[1]);
  const isFirstRender = useRef(true);

  // React strict-mode unmount and remount my component again
  // with the SAME state T-T (double useEffect triggering)
  useEffect(() => {
    isFirstRender.current = true;
  }, []);

  useEffect(() => {
    // This hook trigger once when mounted to DOM. I don't want that.
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    async function putVote() {
      const voteResult = await fetch(
        // just realize we need to add prefix NEXT_PUBLIC
        // to make variable accessible in client side.
        `${process.env.NEXT_PUBLIC_SERVER_URI}/post/vote`,
        {
          method: "POST",
          body: JSON.stringify({ post_id, val: vote }),
        },
      );
      // .ok come with range 200-299
      if (voteResult.ok) console.log("vote success: ", voteResult);
      else console.log("vote not good: ", voteResult);
    }
    async function unVote() {
      const unVoteResult = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URI}/post/vote`,
        { method: "DELETE", body: JSON.stringify({ post_id }) },
      );
      if (unVoteResult.ok) console.log("unvote success: ", unVoteResult);
      else {
        const errorResult = await unVoteResult.text();
        console.log("unVote not good: ", errorResult);
      }
    }

    if (vote == 0) unVote();
    else putVote();

    // add post_id dependency since we send it too, ESLint didn't let me leave it.
  }, [vote, post_id]);

  // only for state management
  const handleLike = () => {
    // warn user if spam too fast ?
    if (vote == 0) {
      setVote(1);
      setUpVoteNum(upVoteNum + 1);
    } else if (vote == 1) {
      setVote(0);
      setUpVoteNum(upVoteNum - 1);
    } else {
      setVote(1);
      setUpVoteNum(upVoteNum + 1);
      setDownVoteNum(downVoteNum - 1);
    }
  };

  const handleDisLike = () => {
    if (vote == 0) {
      setVote(-1);
      setDownVoteNum(downVoteNum + 1);
    } else if (vote == -1) {
      setVote(0);
      setDownVoteNum(downVoteNum - 1);
    } else {
      setVote(-1);
      setDownVoteNum(downVoteNum + 1);
      setUpVoteNum(upVoteNum - 1);
    }
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
        <p className="font-semibold my-auto pr-2">{upVoteNum}</p>
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
        <p className="font-semibold my-auto pr-2">{downVoteNum}</p>
      </div>
      <ShareButton post_id={post_id} />
    </CardFooter>
  );
};

export default PostFooterAuthorized;
