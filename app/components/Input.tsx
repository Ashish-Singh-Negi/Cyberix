import React from "react";

type Input = {
  type: string;
  name: string;
  count: string | number;
  label?: string;
  state: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
};

const Input = ({ type, name, count, label, state, setState }: Input) => {
  return (
    <div className="h-10 w-full relative flex ">
      <input
        type={`${type}`}
        name={`${name}-${count}`}
        id={`${name}-${count}`}
        value={state}
        onChange={(e) => setState(e.target.value)}
        required
        className="h-10 w-full border-2 border-gray-300  dark:border-custom outline-none transition-colors duration-[0.3s] focus:border-blue-500 px-2 rounded-lg peer dark:bg-gray-900 dark:focus:border-blue-500"
      />
      <label
        htmlFor={`${name}-${count}`}
        className="absolute bg-white rounded-md px-[1px] top-2 left-2 transition-all duration-[0.3s] cursor-pointer peer-valid:-translate-y-[18px] peer-valid:text-sm peer-valid:scale-90 peer-focus:-translate-y-[18px] peer-focus:text-sm peer-focus:scale-90 dark:bg-gray-900 dark:text-gray-300"
      >
        {label}
      </label>
    </div>
  );
};

export default Input;
