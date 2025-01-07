"use client";

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CardDescription } from "@/components/ui/card";
import { CircleUser } from "lucide-react";
import Link from "next/link";

const ClickablePostOwner = ({
    user_id,
    user_image,
    user_name,
}: {
    user_id: string;
    user_image: string;
    user_name: string;
}) => {
    return (
        <Link href={`/user/${user_id}`}>
            <CardDescription className="flex justify-start content-center gap-2">
                <Avatar className="h-7 w-auto max-w-7">
                    <AvatarImage src={user_image} />
                    <AvatarFallback>
                        <CircleUser />
                    </AvatarFallback>
                </Avatar>
                <p className="my-auto">{user_name}</p>
            </CardDescription>
        </Link>
    );
};

export default ClickablePostOwner;
