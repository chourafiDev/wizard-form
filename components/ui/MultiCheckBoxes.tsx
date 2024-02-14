import React from "react";

type CheckBoxPops = {
  name: string;
  id: string;
  value: string;
  label: string;
  index: number;
  register: any;
};

const MultiCheckBox = ({
  name,
  id,
  value,
  label,
  index,
  register,
}: CheckBoxPops) => {
  return (
    <div className="flex items-center gap-2 group">
      <input
        className="w-4 h-4 accent-brand/40"
        type="checkbox"
        // value={value}
        id={id}
        {...register(`${name}.${index}` as const)}
      />
      <label
        className="text-dark text-sm group-hover:text-brand cursor-pointer duration-200 ease-linear"
        htmlFor={id}
      >
        {label}
      </label>
    </div>
  );
};

export default MultiCheckBox;
