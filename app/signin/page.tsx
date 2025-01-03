import { providerMap, signIn } from "@/auth";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

const page = async ({
    searchParams,
}: {
    searchParams: { callbackUrl: string | undefined };
}) => {
    return (
        <div className="flex w-screen h-screen  items-center">
            <Card className="md:w-1/3 sm:w-1/2 w-full sm:mx-auto my-auto mx-5 h-auto">
                <CardHeader>
                    <CardTitle className="md:text-2xl text-lg">
                        {" "}
                        Welcome to Simply Said!{" "}
                    </CardTitle>
                    <CardDescription className="md:text-lg">
                        Please sign in using OAuth.
                    </CardDescription>
                </CardHeader>
                <CardContent className="h-auto">
                    <div className="flex-col gap-3">
                        {Object.values(providerMap).map((provider) => (
                            <form
                                key={provider.id}
                                action={async () => {
                                    "use server";
                                    try {
                                        await signIn(provider.id, {
                                            redirectTo: searchParams.callbackUrl ?? "",
                                        });
                                    } catch (error) {
                                        // let auth.js handle
                                        throw error;
                                    }
                                }}
                            >
                                <Button className="my-1 w-full text-lg h-12">
                                    {provider.name == "GitHub" ? (
                                        <Image
                                            src="/github_logo.svg"
                                            alt="github logo"
                                            width={25}
                                            height={25}
                                        />
                                    ) : (
                                        <Image
                                            src="/google_logo.svg"
                                            alt="google logo"
                                            width={25}
                                            height={25}
                                        />
                                    )}{" "}
                                    Sign in with {provider.name}
                                </Button>
                            </form>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default page;
