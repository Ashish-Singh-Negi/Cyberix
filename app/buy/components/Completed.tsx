import React from "react";
import { GiConfirmed } from "react-icons/gi";

const Completed = ({
  name,
  status,
  position,
}: {
  name: string;
  status: boolean;
  position: string;
}) => {
  const statusColor = status ? "text-green-400" : "text-gray-400";
  return (
    <p
      className={`absolute top-4 ${position} h-full w-fit flex flex-col gap-1 justify-center items-center`}
    >
      <GiConfirmed
        className={`h-[26px] w-[26px] bg-white dark:bg-black ${statusColor}
       rounded-full`}
      />
      {name}
    </p>
  );
};

export default Completed;
