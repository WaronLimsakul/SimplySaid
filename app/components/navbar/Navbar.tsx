import Link from "next/link";
import Image from "next/image";
import { signIn, signOut } from "@/auth";
import { Session } from "next-auth";
import SearchBar from "./SearchBar";
import { Button } from "@/components/ui/button";
import { getSession } from "@/utils/frontend/get_session";

// note that
// 1. in src, you can add a file in pulic/ then just simply add /filename.png like that.
// 2. we can create component function with async (we use Next.js)
const Navbar = async () => {
    // we can check if there is session going on by awaiting this auth() function.
    // Promise will return {user: {}, id: str, sessionToken: str, userId: str, expires: str}
    const session: null | Session = await getSession();
    if (session) console.log(session);

    return (
        <header className="sticky top-0 z-50 px-5 py-0.5 bg-primary shadow">
            <nav className="flex justify-between items-center">
                <Link href="/">
                    <Image
                        src="/SimplySaid_logo_nav_size.png"
                        alt="logo"
                        width={144}
                        height={5}
                    />
                </Link>
                <SearchBar />
                <div className="flex items-center gap-5 text-primary-foreground">
                    {session && session?.user ? (
                        <>
                            <form
                                action={async () => {
                                    "use server";
                                    await signOut();
                                }}
                            >
                                <Button className="m-2" type="submit">
                                    Logout
                                </Button>
                            </form>
                        </>
                    ) : (
                        <form
                            action={async () => {
                                "use server";
                                await signIn();
                            }}
                        >
                            <Button className="m-2" type="submit">
                                Login
                            </Button>
                        </form>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
