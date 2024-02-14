import React from "react";
import {
  TFreelanceContractavailabilityShcema,
  freelanceContractavailabilityShcema,
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
import { motion } from "framer-motion";
import RadioInput from "@/components/ui/RadioInput";
import TextInput from "@/components/ui/TextInput";

const FreelanceContractAvailability = () => {
  const dispatch = useDispatch();

  // get currentStep and availabilityData from the store
  const { currentStep, availabilityData } = useSelector(
    (state: RootState) => state.wizardForm
  );

  // set up hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TFreelanceContractavailabilityShcema>({
    resolver: zodResolver(freelanceContractavailabilityShcema),
    defaultValues: { ...availabilityData },
  });

  // handle submit form
  const onSubmit = async (data: TFreelanceContractavailabilityShcema) => {
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
              Additional info about &quot;Freelance/Contract&quot; availability.
            </p>
          </div>

          <div className="space-y-3 mt-8">
            <TextInput
              register={register}
              error={errors.fixedRate}
              type="text"
              name="fixedRate"
              label="Minimum fixed rate? (in USD)"
              placeholder=""
            />
            <TextInput
              register={register}
              error={errors.hourlyRate}
              type="text"
              name="hourlyRate"
              label="Minimum hourly rate? (in USD)"
              placeholder=""
            />
            <TextInput
              register={register}
              error={errors.hours}
              type="text"
              name="hours"
              label="Minimum hours for a contract?"
              placeholder=""
            />

            <div>
              <div className="flex justify-between items-center">
                <h5 className="text-sm text-dark font-medium">
                  Are you willing to work remotely?
                </h5>
                {errors.freelanceContractRemotely && (
                  <p className="text-red-500 text-sm">
                    {errors.freelanceContractRemotely.message}
                  </p>
                )}
              </div>
              <div className="mt-2 p-2 flex items-center gap-8">
                <RadioInput
                  name="freelanceContractRemotely"
                  id="yes"
                  value="yes"
                  label="Yes"
                  register={register}
                />
                <RadioInput
                  name="freelanceContractRemotely"
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

export default FreelanceContractAvailability;
