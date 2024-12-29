"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ExternalLink } from "lucide-react";

const ShareButton = ({ post_id }: { post_id: string }) => {
  const { toast } = useToast();
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={async () => {
        await navigator.clipboard.writeText(
          `${process.env.NEXT_PUBLIC_CLIENT_URI}/post/?post_id=${post_id}`,
        );
        toast({
          title: "Link copied to clipboard.",
          check: true,
        });
      }}
      className="rounded-full"
    >
      <ExternalLink />
    </Button>
  );
};

export default ShareButton;
