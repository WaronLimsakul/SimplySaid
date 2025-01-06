"use client";

import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { MdParser } from "@/utils/frontend/md_parser/MdParser";
import React from "react";
import DOMPurify from "dompurify";
import { Card, CardContent, CardDescription } from "@/components/ui/card";

const WritingPostArea = ({
    content,
    setContent,
}: {
    content: string;
    setContent: React.Dispatch<React.SetStateAction<string>>;
}) => {
    const parser = new MdParser();
    return (
        <div className="grid grid-cols-11 h-[60vh]">
            <div className="col-span-11 md:col-span-5">
                <CardDescription>Write your explanation here:</CardDescription>
                <Textarea
                    onChange={(e) => {
                        setContent(e.target.value);
                        console.log(parser.render(content));
                    }}
                    placeholder="*markdown language preview is enabled"
                    className="min-h-full"
                />
            </div>
            <Separator
                orientation="vertical"
                className="mx-auto md:col-span-1 hidden md:block"
            />
            <div className="col-span-11 mt-8 md:mt-0 md:col-span-5 md:block">
                <CardDescription> See your explanation preview here:</CardDescription>
                <Card className="min-h-full">
                    <CardContent className="my-3 w-auto h-full">
                        <div
                            dangerouslySetInnerHTML={{
                                __html: DOMPurify.sanitize(parser.render(content)),
                            }}
                        />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default WritingPostArea;
