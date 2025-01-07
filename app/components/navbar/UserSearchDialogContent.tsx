"use client";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import React, { FormEventHandler, Ref, useRef } from "react";

const UserSearchDialogContent = () => {
  const hiddenCloseButton: Ref<HTMLButtonElement> = useRef(null);
  const router = useRouter();
  const { toast } = useToast();

  const handleSearchUser: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target as HTMLFormElement);
    const fetchedResult = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URI}/user?name=${form.get("userName")}`,
    );
    if (!fetchedResult.ok) {
      toast({ title: "User not found", symbol: "fail" });
      return;
    }
    const target_id = (await fetchedResult.json())._id;
    router.push(`/user/${target_id}`);
    hiddenCloseButton.current?.click();
  };
  return (
    <DialogContent className="w-5/6 mx-auto top-[30%]">
      <DialogHeader>
        <DialogTitle>Search user</DialogTitle>
        <DialogDescription className="items-start">
          Search User by their username. Note that it must be exact.
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSearchUser}>
        <Input
          type="text"
          placeholder="🧑Who do you want to see?"
          name="userName"
          className="px-auto py-auto rounded-md bg-zinc-50"
        />
      </form>
      <DialogClose className="hidden" asChild>
        <button ref={hiddenCloseButton} />
      </DialogClose>
    </DialogContent>
  );
};

export default UserSearchDialogContent;
