import React from "react";

const InputWithLabel = () => {
  return (
    <div className="bg-white rounded-lg">
      <div className="relative bg-inherit">
        <input
          type="text"
          id="username"
          name="username"
          className="outline-none rounded-md p-3 text-dark/80 font-medium border w-full text-sm hover:border-brand duration-200 ease-in peer bg-transparent placeholder-transparent"
          placeholder="Type inside me"
        />
        <label
          htmlFor="username"
          className="absolute cursor-text left-0 -top-3 text-sm text-dark/80 bg-inherit mx-1 px-1 peer-placeholder-shown:top-3 peer-focus:-top-3 peer-focus:text-brand transition-all"
        >
          Type inside me
        </label>
      </div>
    </div>
  );
};

export default InputWithLabel;
