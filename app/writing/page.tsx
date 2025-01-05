import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import React from "react";
import WritingPostArea from "../components/posting/WritingPostArea";
import { Button } from "@/components/ui/button";
import WarningDialogPosting from "../components/posting/WarningDialogPosting";

const page = () => {
    return (
        <div className="mt-5 grid grid-cols-12">
            <div className="col-span-1 " />
            <div className="col-span-10 min-h-[90vh]">
                <WarningDialogPosting />
                <Card className="min-h-[90%]">
                    <CardHeader>
                        <CardTitle className="text-xl">
                            Let&apos;s hone our understanding!
                        </CardTitle>
                        <CardDescription className="text-lg">
                            Write a simple explanation for a concept you are learning and see
                            how much you know (and don&apos;t know)!
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="min-h-full">
                        <WritingPostArea />
                    </CardContent>
                    <CardFooter className="justify-end">
                        <Button className="mt-2">Publish</Button>
                    </CardFooter>
                </Card>
            </div>

            <div className="col-span-1 " />
        </div>
    );
};

export default page;
