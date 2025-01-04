import Navbar from "../components/navbar/Navbar";
import PostingButton from "../components/posting/PostingButton";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <main>
            <Navbar />
            {children}
            <PostingButton />
        </main>
    );
}
