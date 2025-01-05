"use client";

import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { MdParser } from "@/utils/frontend/md_parser/MdParser";
import React, { useState } from "react";
import DOMPurify from "dompurify";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const WritingPostArea = () => {
  const [content, setContent] = useState("");
  const parser = new MdParser();
  return (
    <div className="grid grid-cols-11 h-full">
      <div className="col-span-5">
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
      <Separator orientation="vertical" className="mx-auto col-span-1 h-full" />
      <div className="col-span-5">
        <CardDescription> See your explanation preview here:</CardDescription>
        <Card className="min-h-full">
          <CardContent className="mt-3">
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
