import React from "react";

type TextAreaProps = {
  name: string;
  label?: string;
  register: any;
  error: any;
};

const TextArea = ({ label, error, name, register }: TextAreaProps) => {
  return (
    <div className="space-y-1">
      <div className="flex justify-between items-center">
        <label className="text-sm text-dark font-medium" htmlFor={name}>
          {label}
        </label>
        {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
      </div>

      <textarea
        id={name}
        rows={4}
        {...register(name)}
        className={`outline-none rounded-md p-3 text-dark/80 font-normal border w-full text-sm hover:border-brand duration-200 ease-in ${
          error ? "border-red-500" : "border-gray"
        }`}
      ></textarea>
    </div>
  );
};

export default TextArea;
