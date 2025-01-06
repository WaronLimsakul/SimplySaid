"use client";

import { Button } from "@/components/ui/button";
import { SearchSlash } from "lucide-react";
import Link from "next/link";
import React, { useEffect } from "react";

const Error = ({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) => {
    useEffect(() => {
        console.log("From root/ ", error);
    }, [error]);
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="text-center p-8 bg-white  rounded-lg shadow-md max-w-md">
                <SearchSlash size={48} className="text-zinc-500 mx-auto mb-2" />
                <h1 className="text-4xl font-bold text-zinc-500 mb-4">
                    User not found
                </h1>
                <p className="text-gray-700 text-lg mb-6">
                    We couldn&apos;t find the user you were looking for.
                </p>
                <div className="flex justify-center gap-4">
                    <Link href="/">
                        <Button className="px-4 py-2 bg-secondary text-white rounded hover:bg-green-800">
                            Go Home
                        </Button>
                    </Link>
                    <Button
                        onClick={() => {
                            reset();
                        }}
                        className="px-4 py-2 bg-secondary text-white rounded hover:bg-green-800"
                    >
                        Try again
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Error;
