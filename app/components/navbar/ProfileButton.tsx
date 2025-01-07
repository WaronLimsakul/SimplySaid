import { signOut } from "@/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { LogOut, SquareUserRound } from "lucide-react";
import { Session } from "next-auth";
import Link from "next/link";
import React from "react";
import UserSearchDialog from "./UserSearchDialog";

const ProfileButton = ({ session }: { session: Session }) => {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="mr-3">
          <Avatar className="cursor-pointer">
            <AvatarImage src={session.user?.image ? session.user?.image : ""} />
            <AvatarFallback>
              {session.user?.name ? session.user.name.slice(0, 2) : ":)"}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="h-auto">
          <DropdownMenuLabel>{session.user?.name}</DropdownMenuLabel>
          <Separator orientation="horizontal" className="opacity-50" />
          <DropdownMenuGroup>
            <Link href="/user/profile">
              <DropdownMenuItem className="cursor-pointer">
                Profile
                <DropdownMenuShortcut>
                  <SquareUserRound size="18" />
                </DropdownMenuShortcut>
              </DropdownMenuItem>
            </Link>
            <UserSearchDialog />
            <form
              action={async () => {
                "use server";
                await signOut();
              }}
            >
              <DropdownMenuItem>
                <button type="submit" className="pr-10">
                  Sign out
                </button>
                <DropdownMenuShortcut>
                  <LogOut size="18" />
                </DropdownMenuShortcut>
              </DropdownMenuItem>
            </form>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default ProfileButton;
