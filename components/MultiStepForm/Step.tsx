"use client";

import React from "react";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
import { FiCheck } from "react-icons/fi";
import { motion } from "framer-motion";

type StepProps = {
  id: number;
  name: string;
  body: string;
};

const Step = ({ id, name, body }: StepProps) => {
  const { currentStep } = useSelector((state: RootState) => state.wizardForm);

  const variants = {
    hidden: { display: "none", scale: 0 },
    visible: { display: "block", scale: 1 },
    exit: { display: "none", scale: 0 },
  };
  const variantsText = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  };

  return (
    <li className="flex items-center gap-4">
      <div
        className={`border rounded-full w-10 h-10 flex items-center justify-center ${
          currentStep == id || currentStep > id
            ? "bg-white text-dark border-white"
            : "bg-transparent text-white border-gray"
        }`}
      >
        <motion.div
          initial="hidden"
          animate={currentStep > id || currentStep == 6 ? "visible" : "hidden"}
          exit="exit"
          variants={variants}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <FiCheck className="text-dark text-xl" />
        </motion.div>
        <motion.div
          initial="hidden"
          animate={currentStep <= id ? "visible" : "hidden"}
          exit="exit"
          variants={variants}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {currentStep !== 6 && <p className="font-bold">{id}</p>}
        </motion.div>
      </div>

      <div>
        <motion.p
          initial="hidden"
          animate="visible"
          variants={variantsText}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-gray text-sm"
        >
          {name.toUpperCase()}
        </motion.p>
        <motion.p
          initial="hidden"
          animate="visible"
          variants={variantsText}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="font-medium text-white text-sm"
        >
          {body.toUpperCase()}
        </motion.p>
      </div>
    </li>
  );
};

export default Step;
