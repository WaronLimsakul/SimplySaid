import { auth } from "@/auth";
import { cache } from "react";

// this one makes await auth() to be like fetch(.., {no_store})
export const getSession = cache(async () => {
  const session = await auth();
  return session;
});
