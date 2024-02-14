import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import NavButtons from "../NavButtons";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { setCurrentStep, setFormData } from "@/store/features/wizardFormSlice";
import { TAvailabilityShcema, availabilityShcema } from "@/libs/validation";
import { availabilities } from "@/utils/data";
import RadioCard from "@/components/ui/RadioCard";
import { motion } from "framer-motion";

const WorkAvailability = () => {
  const dispatch = useDispatch();

  // get currentStep and frormData from the store
  const { currentStep, formData } = useSelector(
    (state: RootState) => state.wizardForm
  );

  // handle select option
  const [selectedOption, setSelectedOption] = useState<string>(
    formData.availability || ""
  );

  const handleOptionChange = (value: string) => {
    setSelectedOption(value);
  };

  // set up hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TAvailabilityShcema>({
    resolver: zodResolver(availabilityShcema),
  });

  // handle submit form
  const onSubmit = async (data: TAvailabilityShcema) => {
    dispatch(setFormData(data));
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
              Work Availability {formData.availability}
            </h1>
            <p className="text-dark/60 md:text-lg text-base">
              Are you available for work?
            </p>
          </div>

          <ul className="flex flex-col gap-4 mt-8">
            {availabilities.map(({ id, title, value }) => (
              <RadioCard
                key={id}
                title={title}
                value={value}
                selectedOption={selectedOption}
                name="availability"
                handleOptionChange={handleOptionChange}
                register={register}
              />
            ))}
          </ul>

          {errors.availability?.message && (
            <p className="text-red-500 text-sm mt-3">
              {errors.availability?.message}
            </p>
          )}
        </div>

        <NavButtons />
      </form>
    </motion.div>
  );
};

export default WorkAvailability;
