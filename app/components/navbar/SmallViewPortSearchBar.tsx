"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { Ref, useRef, useState } from "react";

const SmallViewPortSearchBar = () => {
  const [query, setQuery] = useState("");
  // we access DOM by using ref.
  const hiddenCloseButton: Ref<HTMLButtonElement> = useRef(null);
  const router = useRouter();

  // No query choice for mobile
  const search = () => {
    router.push(`${process.env.NEXT_PUBLIC_CLIENT_URI}/post?fuzzy=${query}`);
    hiddenCloseButton.current?.click();
  };
  return (
    <div className="md:hidden flex items-center">
      <Dialog>
        <DialogTrigger>
          <Search color="white" />
        </DialogTrigger>
        <DialogContent className="w-5/6 mx-auto top-[30%]">
          <DialogHeader>
            <DialogTitle>Search explanation</DialogTitle>
            <DialogDescription className="items-start">
              Using keyword search for simple explanation by fuzzy search.
            </DialogDescription>
          </DialogHeader>
          <Input
            type="text"
            placeholder="💡Let's demystify..."
            className="px-auto py-auto rounded-md bg-zinc-50"
            onChange={(e) => {
              setQuery(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key == "Enter") search();
            }}
          />
          <DialogClose className="hidden" asChild>
            <button ref={hiddenCloseButton} />
          </DialogClose>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SmallViewPortSearchBar;
