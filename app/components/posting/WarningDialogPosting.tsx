import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { CircleAlert } from "lucide-react";
import Link from "next/link";
import React from "react";

const WarningDialogPosting = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="my-2" variant="link">
                    {"<-- Back to main page"}
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-xl text-zinc-900 flex gap-1 items-center">
                        <CircleAlert /> Warning
                    </DialogTitle>
                </DialogHeader>
                <p>
                    Navigating back to main means that your draft will not be saved. Are
                    you sure you want to go back?
                </p>
                <DialogFooter>
                    <Button variant="default">
                        <Link href="/" className="">
                            Go back
                        </Link>
                    </Button>
                    <DialogClose asChild>
                        <Button variant="outline">Cancle</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default WarningDialogPosting;
