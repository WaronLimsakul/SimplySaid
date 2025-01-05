import { auth } from "@/auth";
import Navbar from "../components/navbar/Navbar";
import PostingButton from "../components/posting/PostingButton";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  return (
    <main>
      <Navbar />
      {children}
      {session && <PostingButton />}
    </main>
  );
}
