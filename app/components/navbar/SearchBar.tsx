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
import { navigate } from "@/utils/frontend/client_nav";
import Link from "next/link";
import { useRouter } from "next/navigation";

const filters = [
  { name: "General", value: "fuzzy" },
  { name: "Topic", value: "object" },
  { name: "Tags", value: "tags" },

  // No one will use this. we need to change to just user name.
  { name: "User ID", value: "user_id" },
  // Title... upcoming feature.
];

// dev validate searchBy before searching.
const SearchBar = () => {
  const [searchBy, setSearchBy] = useState("fuzzy");
  const [query, setQuery] = useState("");
  const [isFetching, setIsFetching] = useState(false);
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
        <SelectTrigger className="m-1 w-1/4 border-primary-foreground text-primary-foreground border-2">
          <SelectValue
            placeholder="General"
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
        placeholder="Let's demystify..."
        className="bg-zinc-50 m-1"
        onChange={(e) => {
          setQuery(e.target.value);
        }}
        onKeyDown={(event) => {
          if (event.key == "Enter") search();
        }}
      />
      <Button
        disabled={isFetching}
        onClick={search}
        className="m-1 bg-white text-zinc-800 hover:bg-gray-200"
      >
        Search
      </Button>
    </div>
  );
};

export default SearchBar;
