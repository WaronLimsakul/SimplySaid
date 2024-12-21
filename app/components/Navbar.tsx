import Link from "next/link";
import Image from "next/image";
import { auth, signIn, signOut } from "@/auth";

// note that
// 1. in src, you can add a file in pulic/ then just simply add /filename.png like that.
// 2. we can create component function with async (we use Next.js)
const Navbar = async () => {
    // we can check if there is session going on by awaiting this auth() function.
    const session = await auth();
    return (
        <header className="px-5 py-3 bg-white shodow-sm font-sans">
            <nav className="flex justify-between items-center">
                <Link href="/">
                    <Image
                        src="/SimplySaid_logo_2.6.png"
                        alt="logo"
                        width={144}
                        height={30}
                    />
                </Link>
                <div className="flex items-center gap-5 text-orange-600">
                    {session && session?.user ? (
                        <>
                            <form
                                action={async () => {
                                    "use server";
                                    await signOut();
                                }}
                            >
                                <button type="submit">Logout</button>
                            </form>
                        </>
                    ) : (
                        <form
                            action={async () => {
                                "use server";
                                await signIn();
                            }}
                        >
                            <button type="submit">Login</button>
                        </form>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
