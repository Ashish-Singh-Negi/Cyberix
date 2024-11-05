import React from "react";

const SmallLoader = ({ size }: { size: string }) => (
  <div
    className={`${size} border-2 dark:border-white rounded-full border-t-2  border-t-blue-500 dark:border-t-blue-500 animate-spin mr-2`}
  ></div>
);

export default SmallLoader;
