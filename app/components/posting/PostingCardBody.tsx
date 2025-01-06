"use client";

import { CardContent, CardFooter } from "@/components/ui/card";
import React, { useState } from "react";
import WritingPostArea from "./WritingPostArea";
import { Button } from "@/components/ui/button";

const PostingCardBody = () => {
    const [content, setContent] = useState("");
    const handlePost = () => { };
    return (
        <div>
            <CardContent>
                <WritingPostArea content={content} setContent={setContent} />
            </CardContent>
            <CardFooter className="justify-end">
                <form onSubmit={handlePost}>
                    <Button className="mt-2" type="submit">
                        Post
                    </Button>
                </form>
            </CardFooter>
        </div>
    );
};

export default PostingCardBody;
