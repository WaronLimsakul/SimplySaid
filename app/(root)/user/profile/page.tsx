import UserCard from "@/app/components/user/UserCard";
import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const page = async () => {
    const session = await auth();
    if (!session || !session.user) throw new Error("Can't find user data");
    return (
        <div className="flex w-screen h-screen justify-center">
            <div className="w-1/2 mx-auto mt-10 h-auto">
                <Button className="mb-3 text-lg text-primary" variant="link">
                    <Link href="/">{"<-- Back to main page"}</Link>
                </Button>
                <UserCard user={session.user} signedIn={true} />
            </div>
        </div>
    );
};

export default page;
