import { steps } from "@/utils/data";
import React from "react";
import Step from "./Step";

const Steps = () => {
  return (
    <div className="bg-job bg-cover bg-no-repeat bg-center w-full lg:flex items-center hidden pl-28 pr-16">
      <div>
        <h1 className="text-white font-semibold text-3xl mb-3">
          We are creative agency Let’s Join with us !
        </h1>
        <p className="text-white/50 font-normal text-base mb-10">
          Join us in bringing ideas to life and shaping unique experiences
          together.
        </p>
        <ul className="space-y-6">
          {steps.map(({ id, name, body }) => (
            <Step key={id} id={id} name={name} body={body} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Steps;
