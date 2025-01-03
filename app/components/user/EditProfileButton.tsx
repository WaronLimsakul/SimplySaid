import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import React from "react";

const EditProfileButton = () => {
    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button>Edit profile</Button>
                </DialogTrigger>
                <DialogContent>
                    <form>
                        <DialogHeader>
                            <DialogTitle>Edit your information</DialogTitle>
                            <DialogDescription>
                                Edit your profile then click save
                            </DialogDescription>
                        </DialogHeader>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default EditProfileButton;
