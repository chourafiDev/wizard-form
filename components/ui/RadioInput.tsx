import React from "react";

type RadioInputProps = {
  name: string;
  id: string;
  value: string;
  label: string;
  register: any;
};

const RadioInput = ({ name, id, value, label, register }: RadioInputProps) => {
  return (
    <div className="flex items-center gap-2 group">
      <input
        className="w-5 h-5 accent-brand/40 group-hover:scale-[1.1] duration-200 ease-linear"
        type="radio"
        value={value}
        id={id}
        {...register(name)}
      />
      <label
        className="text-dark group-hover:text-brand cursor-pointer duration-200 ease-linear"
        htmlFor={id}
      >
        {label}
      </label>
    </div>
  );
};

export default RadioInput;
