import React from "react";
import { RootState } from "@/store";
import { useSelector } from "react-redux";

const ProgressBar = () => {
  const { currentStep } = useSelector((state: RootState) => state.wizardForm);

  return (
    <div>
      <h4 className="uppercase text-dark/70 font-medium text-sm mb-2">
        {currentStep} of 5 completed
      </h4>

      <div className="lg:w-96 w-full h-[6px] rounded-full bg-gray/20">
        <div
          className={`w-[${
            20 * currentStep
          }%] h-full rounded-full bg-brand duration-300 ease-linear`}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
