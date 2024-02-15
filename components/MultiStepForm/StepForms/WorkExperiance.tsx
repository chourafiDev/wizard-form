import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import NavButtons from "../NavButtons";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { setCurrentStep, setFormData } from "@/store/features/wizardFormSlice";
import { workExperianceShcema, TWorkExperianceShcema } from "@/libs/validation";
import { motion } from "framer-motion";
import Select from "@/components/ui/Select";
import TextInput from "@/components/ui/TextInput";
import { experianceFields, workExperiance } from "@/utils/data";
import CheckBox from "@/components/ui/CheckBox";

const WorkExperiance = () => {
  const dispatch = useDispatch();

  // get currentStep and frormData from the store
  const { currentStep, formData } = useSelector(
    (state: RootState) => state.wizardForm
  );

  // set up hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TWorkExperianceShcema>({
    resolver: zodResolver(workExperianceShcema),
    defaultValues: { ...formData },
  });

  console.log(errors.experiances);

  // handle submit form
  const onSubmit = async (data: TWorkExperianceShcema) => {
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
          <h1 className="font-semibold text-dark md:text-2xl text-xl mb-1">
            Work Experiance
          </h1>

          <div className="space-y-4 mt-10">
            <Select
              name="workExperiance"
              label="Work Experiance"
              selectedOptionText="Choose a range"
              register={register}
              error={errors.workExperiance}
              options={workExperiance}
            />

            <TextInput
              register={register}
              error={errors.githubUrl}
              type="text"
              name="githubUrl"
              label="Your github URL"
              placeholder="e.g. https://www.github.com/username"
            />

            <fieldset>
              <legend className="mb-3 font-medium text-base text-dark">
                Experiance Fields
              </legend>
              <div className="grid grid-cols-2 gap-3">
                {experianceFields.map(({ id, label, value }) => (
                  <CheckBox
                    key={id}
                    name="experiances"
                    value={value}
                    label={label}
                    register={register}
                  />
                ))}
              </div>

              {errors.experiances && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.experiances.message}
                </p>
              )}
            </fieldset>
          </div>
        </div>

        <NavButtons />
      </form>
    </motion.div>
  );
};

export default WorkExperiance;
