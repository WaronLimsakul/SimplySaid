"use client";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import {
    DropdownMenuItem,
    DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu";
import { UserSearch } from "lucide-react";
import React from "react";
import UserSearchDialogContent from "./UserSearchDialogContent";

const UserSearchDialog = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <DropdownMenuItem
                    onSelect={(e) => {
                        e.preventDefault();
                    }}
                >
                    Search user
                    <DropdownMenuShortcut>
                        <UserSearch size={18} />
                    </DropdownMenuShortcut>
                </DropdownMenuItem>
            </DialogTrigger>
            <UserSearchDialogContent />
        </Dialog>
    );
};

export default UserSearchDialog;
