<input
name="fruit"
type="checkbox"
value="Cherry"
onChange={onChange}
ref={register({ required: 'Please select fruits' })}
/>

---

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import NavButtons from "../NavButtons";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { setCurrentStep, setFormData } from "@/store/features/wizardFormSlice";
import { workExperianceShcema, TWorkExperianceShcema } from "@/libs/validation";
import { motion } from "framer-motion";
import Select from "@/components/ui/Select";
import { experianceFields, workExperiance } from "@/utils/data";
import TextInput from "@/components/ui/TextInput";
import MultiCheckBox from "@/components/ui/MultiCheckBoxes";

type ExperianceField = {
id: number;
label: string;
value: string;
};

type FormData = {
checkboxes: boolean[];
experianceFields: ExperianceField[];
};

const WorkExperiance = () => {
const dispatch = useDispatch();

// get currentStep and frormData from the store
const { currentStep, formData } = useSelector(
(state: RootState) => state.wizardForm
);

console.log(formData);

// set up hook form
const {
register,
handleSubmit,
formState: { errors },
} = useForm<TWorkExperianceShcema>({
resolver: zodResolver(workExperianceShcema),
defaultValues: { ...formData },
});

// handle submit form
const onSubmit: SubmitHandler<FormData> = (data) => {
dispatch(setFormData(data));
dispatch(setCurrentStep(currentStep + 1));

    const selectedValues = data.checkboxes
      .map((isChecked, index) =>
        isChecked ? data.experianceFields[index].value : null
      )
      .filter(Boolean);

    console.log("Selected Values:", selectedValues);

};

return (
<motion.div
initial={{ opacity: 0, translateX: currentStep * 50 }}
animate={{ opacity: 1, translateX: 0 }}
exit={{ opacity: 0, translateX: -currentStep * 50 }}
transition={{ duration: 0.5 }}
className="h-full" >
<form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-between h-full"
      >
<div>
<h1 className="font-semibold text-dark text-2xl mb-1">
Work Experiance
</h1>

          {/* <div className="space-y-4 mt-10">
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

            <fieldset className="space-y-2">
              <legend className="text-dark font-medium">
                Experiance Fields
              </legend>

              {experianceFields.map(({ id, value }, i) => (
                <MultiCheckBox
                  key={id}
                  name="experianceFields"
                  id={id}
                  value={value}
                  label={value}
                  index={i}
                  register={register}
                />
              ))}

              {errors.experianceFields && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.experianceFields?.message}
                </p>
              )}
            </fieldset>
          </div> */}

          {experianceFields.map(({ id, label, value }) => (
            <div key={id}>
              <label>
                {label}
                <input
                  type="checkbox"
                  {...register(`checkboxes.${id}` as const)}
                />
              </label>
            </div>
          ))}

          {errors.checkboxes && (
            <p className="text-red-500 text-sm mt-1">
              {errors.checkboxes?.root?.message}
            </p>
          )}
        </div>

        <NavButtons />
      </form>
    </motion.div>

);
};

export default WorkExperiance;
