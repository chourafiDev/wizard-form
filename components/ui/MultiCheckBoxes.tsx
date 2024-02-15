import React from "react";

type CheckBoxPops = {
  name: string;
  id: string | number;
  value: string;
  label: string;
  register: any;
};

const MultiCheckBox = ({ name, id, value, label, register }: CheckBoxPops) => {
  return (
    <div className="flex items-center gap-2 group">
      <input
        className="w-4 h-4 accent-brand/40"
        type="checkbox"
        value={value}
        id={value}
        {...register(name)}
      />
      <label
        className="text-dark/70 text-sm group-hover:text-brand cursor-pointer duration-200 ease-linear"
        htmlFor={value}
      >
        {label}
      </label>
    </div>
  );
};

export default MultiCheckBox;
