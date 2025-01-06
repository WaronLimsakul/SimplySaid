import React, { useState } from "react";

const TagsInput = ({
    tags,
    setTags,
}: {
    tags: string[];
    setTags: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
    const [input, setInput] = useState("");
    const handleAddTag = () => { };
    return <div>TagsInput</div>;
};

export default TagsInput;
