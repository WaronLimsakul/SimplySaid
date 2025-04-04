import { auth } from "@/auth";
import Navbar from "../components/navbar/Navbar";
import PostingButton from "../components/posting/PostingButton";
import { Analytics } from "@vercel/analytics/react";

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
      <Analytics />
      {session && <PostingButton />}
    </main>
  );
}
