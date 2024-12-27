import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowBigDown, ArrowBigUp, ExternalLink } from "lucide-react";

const PostFooterGuest = async ({ votes }: { votes: [number, number] }) => {
  return (
    <CardFooter className="flex p-4 justify-start gap-1">
      <div className="flex h-auto border items-center rounded-full space-x-1 text-sm px-1">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full [&_svg]:h-auto [&_svg]:w-auto"
        >
          <ArrowBigUp strokeWidth={1.5} />
        </Button>
        <p className="my-auto pr-2">{votes[0]}</p>
        <Separator orientation="vertical" className="h-6 mx-1" />
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full [&_svg]:h-auto [&_svg]:w-auto"
        >
          <ArrowBigDown strokeWidth={1.5} />
        </Button>
        <p className="my-auto pr-2">{votes[1]}</p>
      </div>
      <Button variant="ghost" size="icon" className="rounded-full">
        <ExternalLink />
      </Button>
    </CardFooter>
  );
};

export default PostFooterGuest;