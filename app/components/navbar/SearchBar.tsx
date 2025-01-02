"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";

const filters = [
    { name: "Fuzzy Search (DIY)", value: "fuzzy" },
    { name: "Atlas Search", value: "atlas" },
    { name: "Search by Topic", value: "object" },
    { name: "Search by Tags", value: "tags" },
    { name: "Search by UserID", value: "user_id" },
];

// dev validate searchBy before searching.
const SearchBar = () => {
    const [searchBy, setSearchBy] = useState("fuzzy");
    const [query, setQuery] = useState("");
    const router = useRouter();

    const search = () => {
        router.push(
            `${process.env.NEXT_PUBLIC_CLIENT_URI}/post?${searchBy}=${query}`,
        );
    };
    // use "onValueChange" for handle state with <Select>
    // use "onChange" for normal <input>
    return (
        <div className="flex w-full max-w-lg align-center justify-center">
            <Select onValueChange={setSearchBy}>
                <SelectTrigger className="m-1 w-1/3 border-primary-foreground text-primary-foreground border-2">
                    <SelectValue
                        placeholder="Fuzzy Search (DIY)"
                        defaultValue={"fuzzy"}
                    ></SelectValue>
                </SelectTrigger>
                <SelectContent>
                    {filters.map((filt) => (
                        <SelectItem value={filt.value} key={filt.name}>
                            {filt.name}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <Input
                type="text"
                placeholder="💡Let's demystify..."
                className="bg-zinc-50 m-1"
                onChange={(e) => {
                    setQuery(e.target.value);
                }}
                onKeyDown={(event) => {
                    if (event.key == "Enter") search();
                }}
            />
            <Button
                onClick={search}
                className="m-1 bg-white text-zinc-800 hover:bg-gray-200"
            >
                Search
            </Button>
        </div>
    );
};

export default SearchBar;
