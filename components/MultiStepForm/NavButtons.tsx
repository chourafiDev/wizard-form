import { RootState } from "@/store";
import { setCurrentStep } from "@/store/features/wizardFormSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const NavButtons = () => {
  const dispatch = useDispatch();
  const { currentStep } = useSelector((state: RootState) => state.wizardForm);

  const prev = () => {
    dispatch(setCurrentStep(currentStep - 1));
  };

  return (
    <div className="flex justify-between items-center lg:mt-0 mt-10">
      <div>
        {currentStep > 1 && currentStep < 6 && (
          <button className="btn btn-default" type="button" onClick={prev}>
            Go Back
          </button>
        )}
      </div>
      {currentStep < 6 && (
        <button className="btn btn-primary">
          {currentStep == 5 ? "Confirm & Submit" : "Next"}
        </button>
      )}
    </div>
  );
};

export default NavButtons;
