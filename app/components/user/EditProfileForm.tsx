"use client";

import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import User from "@/lib/schema_design/user_type";
import { Save } from "lucide-react";
import React, { FormEventHandler, useState } from "react";

const EditProfileForm = ({ user }: { user: User }) => {
  const [fetching, setFetching] = useState(false);
  const { toast } = useToast();

  const handleSubmitProfile: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setFetching(true);
    // this tells TS that we know for sure it will be HTMLFormElement
    const form = new FormData(e.target as HTMLFormElement);

    const sentData = { name: form.get("name"), email: form.get("email") };

    const result = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URI}/user/${user.id}`,
      { method: "PUT", body: JSON.stringify(sentData) },
    );

    if (result.ok) toast({ title: "Changes Saved", symbol: "check" });
    else toast({ title: "Saving Fail, please try again", symbol: "fail" });
    setFetching(false);
  };

  return (
    <form onSubmit={handleSubmitProfile}>
      <div className="grid w-full gap-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <p className="text-right">Name: </p>
          <Input
            type="text"
            name="name"
            className="col-span-2"
            defaultValue={user.name}
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <p className="text-right">Email: </p>
          <Input
            type="email"
            name="email"
            className="col-span-2"
            defaultValue={user.email}
          />
        </div>
      </div>
      <DialogFooter className="justify-center">
        <Button
          type="submit"
          disabled={fetching}
          className="bg-secondary hover:bg-green-700"
        >
          <Save />
          Save
        </Button>
      </DialogFooter>
    </form>
  );
};

export default EditProfileForm;
