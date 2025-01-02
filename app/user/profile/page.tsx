import Link from "next/link";

const page = () => {
    return (
        <div className="my-10 w-full mx-auto">
            <Link href="/">{"<- Go back to main page"}</Link>
            <p className="text-xl">This is a profile page</p>
        </div>
    );
};

export default page;
