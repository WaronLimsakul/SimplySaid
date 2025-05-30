import { LoadingSpinner } from "@/app/components/feed/LoadingSpinner";
import React from "react";

const loading = () => {
    return (
        <div className="flex w-screen h-screen justify-center items-center">
            <LoadingSpinner size={60} color="#ff6f00" />
        </div>
    );
};

export default loading;
