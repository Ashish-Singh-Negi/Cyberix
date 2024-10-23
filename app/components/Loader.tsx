import React from "react";

const Loader = () => {
  return (
    <div className="h-full w-full text-2xl font-bold flex flex-col gap-2 items-center justify-center">
      <p className="flex items-end text-3xl gap-1">
        Loading
        <span className="h-2 w-2 transition-all animate-loading [--loading-delay:300ms] rounded-full bg-gray-950 dark:bg-white mb-1"></span>
        <span className="h-2 w-2 transition-all animate-loading [--loading-delay:500ms] rounded-full bg-gray-950 dark:bg-white mb-1"></span>
        <span className="h-2 w-2 transition-all animate-loading [--loading-delay:700ms] rounded-full bg-gray-950 dark:bg-white mb-1"></span>
      </p>
      <p className="text-3xl font-medium">just a moment</p>
    </div>
  );
};

export default Loader;
