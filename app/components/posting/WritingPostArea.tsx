"use client";

import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { MdParser } from "@/utils/frontend/md_parser/MdParser";
import React, { useState } from "react";
import DOMPurify from "dompurify";

const WritingPostArea = () => {
    const [content, setContent] = useState("");
    const parser = new MdParser();
    return (
        <div className="grid grid-cols-11">
            <div className="col-span-5">
                <Textarea
                    onChange={(e) => {
                        setContent(e.target.value);
                        console.log(parser.render(content));
                    }}
                    placeholder="markdown language preview is enabled"
                />
            </div>
            <Separator orientation="vertical" className="mx-1 col-span-1" />
            <div className="col-span-5">
                <div
                    dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(parser.render(content)),
                    }}
                />
            </div>
        </div>
    );
};

export default WritingPostArea;
