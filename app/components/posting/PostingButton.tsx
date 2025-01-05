import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
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
        className="[&_svg]:h-auto [&_svg]:w-auto rounded-full md:h-16 md:w-16 h-5 w-5 fixed md:bottom-10 md:right-10"
        type="submit"
      >
        <Pencil size={36} strokeWidth={1.5} />
      </Button>
    </form>
  );
};

export default PostingButton;
