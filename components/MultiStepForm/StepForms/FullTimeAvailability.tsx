import React from "react";
import {
  TAvailabilityStatusShcema,
  availabilityStatusShcema,
} from "@/libs/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import NavButtons from "../NavButtons";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import {
  setAvailabilityData,
  setCurrentStep,
} from "@/store/features/wizardFormSlice";
import Select from "@/components/ui/Select";
import { availabilityLooking, minimumSalaryFullTime } from "@/utils/data";
import { motion } from "framer-motion";
import RadioInput from "@/components/ui/RadioInput";

const FullTimeAvailability = () => {
  const dispatch = useDispatch();

  // get currentStep and frormData from the store
  const { currentStep, availabilityData } = useSelector(
    (state: RootState) => state.wizardForm
  );

  // set up hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TAvailabilityStatusShcema>({
    resolver: zodResolver(availabilityStatusShcema),
    defaultValues: { ...availabilityData },
  });

  // handle submit form
  const onSubmit = async (data: TAvailabilityStatusShcema) => {
    dispatch(setAvailabilityData(data));
    dispatch(setCurrentStep(currentStep + 1));
  };

  return (
    <motion.div
      initial={{ opacity: 0, translateX: currentStep * 50 }}
      animate={{ opacity: 1, translateX: 0 }}
      exit={{ opacity: 0, translateX: -currentStep * 50 }}
      transition={{ duration: 0.5 }}
      className="h-full"
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-between h-full"
      >
        <div>
          <div>
            <h1 className="font-semibold text-dark md:text-2xl text-xl mb-1">
              Work Availability
            </h1>
            <p className="text-dark/60 md:text-lg text-base">
              Additional info about &quot;Full Time&quot; availability.
            </p>
          </div>

          <div className="space-y-10 mt-8">
            <Select
              name="minimumSalary"
              label="Minimum salary? (in USD)"
              selectedOptionText="Choose a range"
              register={register}
              error={errors.minimumSalary}
              options={minimumSalaryFullTime}
            />
            <Select
              name="availabilityLooking"
              label="How soon would you be looking to start?"
              selectedOptionText="Choose your availability"
              register={register}
              error={errors.availabilityLooking}
              options={availabilityLooking}
            />

            <div>
              <div className="flex justify-between items-center">
                <h5 className="text-sm text-dark font-medium">
                  Are you willing to work remotely?
                </h5>
                {errors.remotely && (
                  <p className="text-red-500 text-sm">
                    {errors.remotely.message}
                  </p>
                )}
              </div>
              <div className="mt-2 p-2 flex items-center gap-8">
                <RadioInput
                  name="remotely"
                  id="yes"
                  value="yes"
                  label="Yes"
                  register={register}
                />
                <RadioInput
                  name="remotely"
                  id="no"
                  value="no"
                  label="No"
                  register={register}
                />
              </div>
            </div>
          </div>
        </div>

        <NavButtons />
      </form>
    </motion.div>
  );
};

export default FullTimeAvailability;
