import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";

const TagsInput = ({
    tags,
    setTags,
}: {
    tags: string[];
    setTags: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
    const [input, setInput] = useState("");

    const handleAddTag: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
        if (
            e.key == "Enter" &&
            input.trim() !== "" &&
            !tags.includes(input.trim())
        ) {
            setTags([...tags, input.trim()]);
            setInput("");
        }
    };

    const handleRemoveTag = (target: string) => {
        setTags(tags.filter((tag) => tag != target));
    };

    return (
        <div className="col-span-8 flex flex-col">
            <Input
                type="text"
                value={input}
                placeholder="Press ↩️enter to add a tag"
                onChange={(e) => {
                    setInput(e.target.value);
                }}
                onKeyDown={handleAddTag}
            />
            <div className="flex flex-wrap gap-1 mt-2">
                {tags.map((tag, index) => (
                    <Badge
                        key={index}
                        className="font-normal hover:bg-green-700 bg-secondary"
                    >
                        {tag}
                        <button
                            type="button"
                            className="ml-2"
                            onClick={() => {
                                handleRemoveTag(tag);
                            }}
                        >
                            x
                        </button>
                    </Badge>
                ))}
            </div>
        </div>
    );
};

export default TagsInput;
