"use client";

import { Button } from "@/components/ui/button";
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
      <div className="text-center p-8 bg-white rounded-lg shadow-md max-w-md">
        <h1 className="text-4xl font-bold text-zinc-500 mb-4">Oops!</h1>
        <p className="text-gray-700 text-lg mb-6">
          Something went wrong. We couldn&apos;t find the page you were looking
          for.
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
