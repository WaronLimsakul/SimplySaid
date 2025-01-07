"use client";

import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { MdParser } from "@/utils/frontend/md_parser/MdParser";
import React from "react";
import DOMPurify from "dompurify";
import { Card, CardContent, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import TagsInput from "./TagsInput";
import PostHeader from "../feed/post_components/PostHeader";

const WritingPostArea = ({
    content,
    setContent,
    title,
    setTitle,
    object,
    setObject,
    tags,
    setTags,
}: {
    content: string;
    setContent: React.Dispatch<React.SetStateAction<string>>;
    title: string;
    setTitle: React.Dispatch<React.SetStateAction<string>>;
    object: string;
    setObject: React.Dispatch<React.SetStateAction<string>>;
    tags: string[];
    setTags: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
    const parser = new MdParser();
    return (
        <div className="grid grid-cols-11 min-h-full">
            <div className="col-span-11 md:col-span-5">
                <div className="grid grid-cols-9 items-center gap-2 mb-2">
                    <p className="col-span-1 text-right">Object: </p>
                    <Input
                        type="text"
                        placeholder="What one concept do you want to explain?"
                        className="col-span-8"
                        onChange={(e) => {
                            setObject(e.target.value);
                        }}
                    />
                </div>
                <div className="grid grid-cols-9 items-center gap-2 mb-2">
                    <p className="col-span-1 text-right">Title: </p>
                    <Input
                        type="text"
                        placeholder="What is a core of your explanation?"
                        className="col-span-8"
                        onChange={(e) => {
                            setTitle(e.target.value);
                        }}
                    />
                </div>
                <div className="grid grid-cols-9 items-center gap-2 mb-2">
                    <p className="col-span-1 text-right">Tags: </p>
                    <TagsInput tags={tags} setTags={setTags} />
                </div>
                <CardDescription>Write your explanation here:</CardDescription>
                <Textarea
                    onChange={(e) => {
                        setContent(e.target.value);
                    }}
                    placeholder="*markdown language preview is enabled"
                    className="min-h-[50vh]"
                />
            </div>
            <Separator
                orientation="vertical"
                className="mx-auto md:col-span-1 hidden md:block"
            />
            <div className="col-span-11 mt-8 md:mt-0 md:col-span-5 md:block">
                <CardDescription> See your explanation preview here:</CardDescription>
                <Card className="min-h-full">
                    <PostHeader
                        user_id="placeholder"
                        title={title}
                        object={object}
                        tags={tags}
                        user_name="name"
                        user_image="nope"
                    />
                    <Separator className="w-[90%] mx-auto" />
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
