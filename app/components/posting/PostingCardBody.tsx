"use client";

import { CardContent, CardFooter } from "@/components/ui/card";
import React, { FormEventHandler, useState } from "react";
import WritingPostArea from "./WritingPostArea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

const PostingCardBody = () => {
    const { toast } = useToast();
    const router = useRouter();
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");
    const [object, setObject] = useState("");
    const [tags, setTags] = useState<string[]>([]);
    const [posting, setPosting] = useState(false);

    const handlePost: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        if (!content || !title || !tags || !object) {
            toast({ title: "Please fill all the post detail", symbol: "fail" });
            return;
        }
        setPosting(true);
        const result = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}/post`, {
            method: "POST",
            body: JSON.stringify({ post: { object, title, tags, content } }),
        });

        if (result.ok) {
            toast({ title: "Posting Successful", symbol: "check" });
            // may use server redirect. let's see.
            router.push("/");
        } else toast({ title: "Posting Fail, please try again", symbol: "fail" });

        setPosting(false);
    };

    return (
        <div>
            <CardContent>
                <WritingPostArea
                    content={content}
                    setContent={setContent}
                    title={title}
                    setTitle={setTitle}
                    object={object}
                    setObject={setObject}
                    tags={tags}
                    setTags={setTags}
                />
            </CardContent>
            <CardFooter className="justify-end">
                <form onSubmit={handlePost}>
                    <Button disabled={posting} className="mt-2" type="submit">
                        Post
                    </Button>
                </form>
            </CardFooter>
        </div>
    );
};

export default PostingCardBody;
