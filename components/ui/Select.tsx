import { MinimumSalary } from "@/types";
import React from "react";

type SelectProps = {
  name: string;
  label: string;
  register: any;
  error: any;
  selectedOptionText: string;
  options: MinimumSalary[];
};

const Select = ({
  name,
  label,
  register,
  error,
  options,
  selectedOptionText,
}: SelectProps) => {
  return (
    <div className="space-y-1">
      <div className="flex justify-between items-center">
        <label className="text-sm text-dark font-medium" htmlFor={name}>
          {label}
        </label>
        {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
      </div>

      <select
        {...register(name)}
        id={name}
        className={`text-dark/80 bg-white px-3 py-2 outline-none  transition-all cursor-pointer border  ${
          error ? "border-red-500" : "border-gray"
        } hover:border-brand rounded-lg invalid:text-red/30 w-full`}
      >
        <option selected disabled value="">
          {selectedOptionText}
        </option>

        {options.map(({ value, title }) => (
          <option key={value} value={value}>
            {title}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
