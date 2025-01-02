import Link from "next/link";
import Image from "next/image";
import { signIn } from "@/auth";
import { Session } from "next-auth";
import SearchBar from "./SearchBar";
import { Button } from "@/components/ui/button";
import { getSession } from "@/utils/frontend/get_session";
import ProfileButton from "./ProfileButton";
import SignInButton from "./SignInButton";
import SmallViewPortSearchBar from "./SmallViewPortSearchBar";

// note that
// 1. in src, you can add a file in pulic/ then just simply add /filename.png like that.
// 2. we can create component function with async (we use Next.js)
const Navbar = async () => {
    // we can check if there is session going on by awaiting this auth() function.
    // Promise will return {user: {}, id: str, sessionToken: str, userId: str, expires: str}
    const session: null | Session = await getSession();
    // if (session) console.log(session);

    return (
        <header className="sticky top-0 z-50 px-5 md:py-1 py-2 bg-primary shadow">
            <nav className="flex justify-between items-center md:flex-row flex-row">
                {/*(Sign in- Sign out part) Left-most for mobile*/}
                <div className="flex md:hidden items-center gap-5 text-primary-foreground order-1 w-full justify-start">
                    {session && session?.user ? (
                        <ProfileButton session={session} />
                    ) : (
                        <SignInButton />
                    )}
                </div>

                {/*Logo Middle for mobile, left-most for PC*/}
                <div className="order-2 md:order-1 flex-grow flex justify-center">
                    <Link href="/" className="">
                        <Image
                            src="/SimplySaid_logo_nav_size.png"
                            alt="logo"
                            width={200}
                            height={88}
                            className="md:w-[144px] w-auto"
                        />
                    </Link>
                </div>

                {/* toggle input for mobile and full search bar for PC */}
                <div className="flex items-center md:order-2 order-3 w-full justify-end relative">
                    <SmallViewPortSearchBar />
                    <div className="hidden md:flex justify-center flex-grow">
                        <SearchBar />
                    </div>
                </div>

                {/* most-right for PC */}
                <div className="md:flex items-center gap-5 text-primary-foreground md:order-3 hidden">
                    {session && session?.user ? (
                        <ProfileButton session={session} />
                    ) : (
                        <SignInButton />
                    )}
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
