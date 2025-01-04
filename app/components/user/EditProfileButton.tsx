import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import User from "@/lib/schema_design/user_type";
import { Pencil } from "lucide-react";
import React from "react";
import EditProfileForm from "./EditProfileForm";

const EditProfileButton = async ({ user }: { user: User }) => {
    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button className="bg-secondary hover:bg-green-600">
                        <Pencil />
                        Edit profile
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit your information</DialogTitle>
                        <DialogDescription>
                            Edit your profile then click save.
                        </DialogDescription>
                    </DialogHeader>
                    <EditProfileForm user={user} />
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default EditProfileButton;
