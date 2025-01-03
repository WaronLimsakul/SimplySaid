import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import User from "@/lib/schema_design/user_type";
import Link from "next/link";
import React from "react";

const UserCard = ({ user }: { user: User }) => {
    return (
        <Card className="w-auto h-auto">
            <CardHeader>
                <CardTitle className="text-xl">User Information</CardTitle>
                <Avatar className="h-28 w-28">
                    <AvatarImage src={user.image} />
                </Avatar>
            </CardHeader>
            <CardContent>
                <p>
                    <b>Name: </b> {user.name}
                </p>
                <p>
                    <b>E-mail: </b> {user.email}
                </p>
                <p>
                    <b>Posts: </b> {user.posts?.length} posts
                </p>
            </CardContent>
            {user.posts?.length && user.posts.length > 0 ? (
                <CardFooter>
                    <Button className="bg-secondary hover:bg-green-700">
                        <Link href={`/post?user_id=${user.id}`}>
                            {/* &apos; got parsed to ' */}
                            See {user.name}&apos;s posts
                        </Link>
                    </Button>
                </CardFooter>
            ) : (
                ""
            )}
        </Card>
    );
};

export default UserCard;
