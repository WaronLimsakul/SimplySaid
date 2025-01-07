import React from "react";
import { LoadingSpinner } from "../components/feed/LoadingSpinner";

const loading = () => {
  return (
    <div className="flex w-screen h-screen justify-center items-center">
      <LoadingSpinner size={60} color="#ff6f00" />
    </div>
  );
};

export default loading;
