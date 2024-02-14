import React, { FC } from "react";

type InputProps = {
  type: string;
  placeholder?: string;
  name: string;
  label?: string;
  register: any;
  error: any;
};

const TextInput: FC<InputProps> = ({
  type,
  placeholder,
  name,
  label,
  register,
  error,
}) => {
  return (
    <div className="space-y-1">
      <div className="flex justify-between items-center">
        <label className="text-sm text-dark font-medium" htmlFor={name}>
          {label}
        </label>
        {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
      </div>
      <input
        {...register(name)}
        type={type}
        id={name}
        placeholder={placeholder}
        className={`outline-none rounded-md p-3 text-dark/80 font-normal border w-full text-sm hover:border-brand duration-200 ease-in ${
          error ? "border-red-500" : "border-gray"
        }`}
      />
    </div>
  );
};

export default TextInput;
