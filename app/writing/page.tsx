import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import React from "react";

const page = () => {
    return (
        <div className="mt-5 grid grid-cols-12">
            <div className="col-span-1 md:col-span-2" />
            <Card className="col-span-10 md:col-span-8">
                <CardHeader>
                    <CardTitle className="text-xl">
                        Let&apos;s hone our understanding!
                    </CardTitle>
                    <CardDescription className="text-lg">
                        Write a simple explanation for a concept you are learning and see
                        how much you know (and don&apos;t know)!
                    </CardDescription>
                </CardHeader>
            </Card>
            <div className="col-span-1 md:col-span-2" />
        </div>
    );
};

export default page;
