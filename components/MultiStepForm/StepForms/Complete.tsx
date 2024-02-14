import React from "react";
import NavButtons from "../NavButtons";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { motion } from "framer-motion";
import Image from "next/image";

const Complete = () => {
  // get frormData and currentStep from the store
  const { currentStep } = useSelector((state: RootState) => state.wizardForm);

  return (
    <motion.div
      initial={{ opacity: 0, translateX: currentStep * 50 }}
      animate={{ opacity: 1, translateX: 0 }}
      exit={{ opacity: 0, translateX: -currentStep * 50 }}
      transition={{ duration: 0.5 }}
      className="h-full"
    >
      <div className="flex flex-col justify-between h-full">
        <div className="h-full flex flex-col justify-center">
          <Image
            src="/assets/images/badge.png"
            alt="animation-check"
            className="mx-auto mb-10"
            width={90}
            height={90}
          />

          <h1 className="font-semibold text-dark text-3xl text-center">
            Application Submitted
          </h1>
          <p className="font-normal text-dark/60 text-lg text-center mt-6 mb-1">
            Thanks for your interest!
          </p>
          <p className="font-normal text-dark/60 text-lg text-center">
            Our review team will review your application and call you for
            interview.
          </p>
        </div>

        <NavButtons />
      </div>
    </motion.div>
  );
};

export default Complete;
