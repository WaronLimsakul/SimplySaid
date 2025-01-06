import { Button } from "@/components/ui/button";
import { PencilLine } from "lucide-react";
import { redirect } from "next/navigation";

const PostingButton = () => {
  return (
    <form
      action={async () => {
        "use server";
        redirect("/writing");
      }}
    >
      <Button
        size="icon"
        className="[&_svg]:h-auto [&_svg]:w-auto rounded-full md:h-16 md:w-16 h-12 w-12 fixed bottom-7 right-7 md:bottom-10 md:right-10"
        type="submit"
      >
        <PencilLine
          size={36}
          strokeWidth={1.5}
          className="size-12 md:size-36 stroke-1 md:stroke-2"
        />
      </Button>
    </form>
  );
};

export default PostingButton;
