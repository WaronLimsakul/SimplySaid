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
import { navigate } from "@/utils/client_nav";

const filters = [
    // directy map ready to fetch
    { name: "Topic", value: "object" },
    { name: "Tags", value: "tags" },
    { name: "User", value: "user_id" },
];

// dev validate searchBy before searching.
const SearchBar = () => {
    const [searchBy, setSearchBy] = useState("");
    const [query, setQuery] = useState("");
    const [isFetching, setIsFetching] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // little trick: set fetching true first, then at finally, set fetching false
        setIsFetching(true);
        navigate(searchBy, query);
        setIsFetching(false);
    };

    // use "onValueChange" for handle state with <Select>
    // use "onChange" for normal <input>
    return (
        <form
            onSubmit={handleSubmit}
            className="flex w-full max-w-lg align-center justify-center"
        >
            <Select onValueChange={setSearchBy}>
                <SelectTrigger className="m-1 w-1/4 border-primary-foreground text-primary-foreground border-2">
                    <SelectValue placeholder="search by..."></SelectValue>
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
                placeholder="Let's demystify!"
                className="bg-zinc-50 m-1"
                onChange={(e) => {
                    setQuery(e.target.value);
                }}
            />
            <Button
                disabled={isFetching}
                type="submit"
                className="m-1 bg-white text-zinc-800 hover:bg-gray-200"
            >
                Search
            </Button>
        </form>
    );
};

export default SearchBar;