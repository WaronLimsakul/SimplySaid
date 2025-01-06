import UserCard from "@/app/components/user/UserCard";
import { Button } from "@/components/ui/button";
import User from "@/lib/schema_design/user_type";
import Link from "next/link";
import React from "react";

const page = async ({ params }: { params: Promise<{ user_id: string }> }) => {
    let user: User;
    const user_id = (await params).user_id;
    const result = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URI}/user/${user_id}`,
        { method: "GET" },
    );
    if (result.ok) user = await result.json();
    else throw new Error("User not found");

    return (
        <div className="flex w-screen h-screen justify-center">
            <div className="w-1/2 mx-auto mt-10 h-auto">
                <Button className="mb-3 text-lg text-primary" variant="link">
                    <Link href="/">{"<-- Back to main page"}</Link>
                </Button>
                <UserCard user={user} signedIn={false} />
            </div>
        </div>
    );
};

export default page;
