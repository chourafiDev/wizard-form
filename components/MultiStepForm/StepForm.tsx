"use client";

import React from "react";

// Store
import { useSelector } from "react-redux";
import { RootState } from "@/store";

// Forms
import PersonalInfo from "./StepForms/PersonalInfo";
import WorkAvailability from "./StepForms/WorkAvailability";
import FullTimeAvailability from "./StepForms/FullTimeAvailability";
import Complete from "./StepForms/Complete";
import PartTimeAvailability from "./StepForms/PartTimeAvailability";
import CoverLetterResume from "./StepForms/CoverLetterResume";
import WorkExperiance from "./StepForms/WorkExperiance";
import FreelanceContractAvailability from "./StepForms/FreelanceContractAvailability";
import ProgressBar from "./ProgressBar";

const StepForm = () => {
  const { currentStep, formData } = useSelector(
    (state: RootState) => state.wizardForm
  );

  const { availability } = formData;

  function renderFormByStep(step: number) {
    switch (step) {
      case 1:
        return <PersonalInfo />;
      case 2:
        return <WorkAvailability />;
      case 3:
        if (availability == "full time availability") {
          return <FullTimeAvailability />;
        } else if (availability == "part time availability") {
          return <PartTimeAvailability />;
        } else {
          return <FreelanceContractAvailability />;
        }
      case 4:
        return <WorkExperiance />;
      case 5:
        return <CoverLetterResume />;
      case 6:
        return <Complete />;

      default:
        break;
    }
  }
  return (
    <div className="w-full flex flex-col lg:h-screen h-full gap-6 py-10 lg:pr-28 lg:px-0 md:px-10 px-4 overflow-hidden">
      {currentStep < 6 && <ProgressBar />}
      {renderFormByStep(currentStep)}
    </div>
  );
};

export default StepForm;
