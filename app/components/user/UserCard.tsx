import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import User from "@/lib/schema_design/user_type";
import { Telescope } from "lucide-react";
import { Session } from "next-auth";
import Link from "next/link";
import React from "react";
import EditProfileButton from "./EditProfileButton";

const UserCard = ({ user, signedIn }: { user: User; signedIn: boolean }) => {
    return (
        <Card className="w-auto h-auto">
            <CardHeader>
                <CardTitle className="text-xl">User Information</CardTitle>
            </CardHeader>
            <CardContent className="w-auto">
                <div className="w-full h-28 flex items-start">
                    <Avatar className="h-28 w-28">
                        <AvatarImage src={user.image} />
                    </Avatar>
                    <Separator orientation="vertical" className="mx-3" />
                    <div className="">
                        <p>
                            <b>Name: </b> {user.name}
                        </p>
                        <p>
                            <b>E-mail: </b> {user.email}
                        </p>
                        <p>
                            <b>Posts: </b> {user.posts?.length} posts
                        </p>
                        <p>
                            <b>Votings: </b> {user.votes?.length} posts
                        </p>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="flex gap-3">
                {user.posts?.length && user.posts.length > 0 ? (
                    <Button className="">
                        <Link href={`/post?user_id=${user.id}`} className="flex">
                            {/* &apos; got parsed to ' */}
                            <Telescope className="mr-2" /> See {user.name}&apos;s posts
                        </Link>
                    </Button>
                ) : (
                    ""
                )}
                {signedIn ? <EditProfileButton user={user} /> : ""}
            </CardFooter>
        </Card>
    );
};

export default UserCard;
