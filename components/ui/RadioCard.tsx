import React from "react";
import { FaCircleCheck } from "react-icons/fa6";

type SelectProps = {
  value: string;
  title: string;
  selectedOption: string;
  name: string;
  handleOptionChange: (value: string) => void;
  register: any;
};

const RadioCard = ({
  value,
  selectedOption,
  title,
  name,
  handleOptionChange,
  register,
}: SelectProps) => {
  const { onChange, onBlur, ref } = register(name);
  return (
    <label>
      <input
        checked={selectedOption === value}
        className="sr-only"
        type="radio"
        value={value}
        name={name}
        ref={ref}
        onChange={(e) => {
          handleOptionChange(e.target.value);
          onChange(e);
        }}
        onBlur={onBlur}
      />

      <div
        className={`flex items-center gap-4 border rounded-lg p-4 cursor-pointer ${
          selectedOption === value ? "border-brand" : "border-gray/80"
        }  flex items-center gap-4 border rounded-lg p-4 cursor-pointer`}
      >
        {selectedOption === value ? (
          <FaCircleCheck className="text-brand w-5 h-5" />
        ) : (
          <div className="w-5 h-5 rounded-full border border-gray"></div>
        )}
        <h2 className="text-dark">{title}</h2>
      </div>
    </label>
  );
};

export default RadioCard;
