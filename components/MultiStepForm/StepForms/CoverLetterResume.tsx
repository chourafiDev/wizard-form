import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import NavButtons from "../NavButtons";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import {
  setCurrentStep,
  setFormData,
  setMergeData,
} from "@/store/features/wizardFormSlice";
import {
  ACCEPTED_FILE_TYPES,
  TCoverLetterResumeShcema,
  coverLetterResumeShcema,
} from "@/libs/validation";
import { motion } from "framer-motion";
import TextArea from "@/components/ui/TextArea";
import CheckBox from "@/components/ui/CheckBox";
import { FiUploadCloud } from "react-icons/fi";

const CoverLetterResume = () => {
  const dispatch = useDispatch();

  // get currentStep and frormData from the store
  const { currentStep, formData } = useSelector(
    (state: RootState) => state.wizardForm
  );

  const [base64, setBase64] = useState<string | null>(null);

  // set up hook form
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<TCoverLetterResumeShcema>({
    resolver: zodResolver(coverLetterResumeShcema),
    defaultValues: { ...formData },
  });

  const convertToBase64 = (file: any) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setBase64(reader.result as string);
    };
    reader.onerror = (error) => {
      console.error("Error converting file to Base64:", error);
    };
  };

  // handle submit form
  const onSubmit = async (data: TCoverLetterResumeShcema) => {
    const payload = {
      ...data,
      resume: base64,
    };

    dispatch(setFormData(payload));
    dispatch(setCurrentStep(currentStep + 1));
    dispatch(setMergeData());
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
          <h1 className="font-semibold text-dark md:text-2xl text-xl">
            Cover Letter & Resume
          </h1>

          <div className="mt-10">
            <TextArea
              name="coverLatter"
              label="Cover letter"
              register={register}
              error={errors.coverLatter}
            ></TextArea>

            <div className="w-full flex flex-col mt-6 mb-4 space-y-1">
              {errors.resume && (
                <p className="text-red-500 text-sm ml-auto">
                  {errors.resume.message}
                </p>
              )}
              <label
                className={`w-full bg-white border border-dashed ${
                  errors.resume ? "border-red-500" : "border-gray"
                } rounded-md p-4 flex justify-center items-center gap-3 cursor-pointer`}
              >
                <FiUploadCloud className="text-dark text-xl" />
                <span className="mt-2 text-base text-dark/70 leading-normal">
                  Select a file
                </span>
                <Controller
                  name="resume"
                  control={control}
                  render={({ field }) => (
                    <input
                      type="file"
                      id="CV"
                      className="sr-only"
                      name={field.name}
                      ref={field.ref}
                      onBlur={field.onBlur}
                      onChange={(e) => {
                        if (e.target.files && e.target.files.length > 0) {
                          const file = e.target.files[0];
                          field.onChange(e.target.files);
                          convertToBase64(file);
                        }
                      }}
                      accept={ACCEPTED_FILE_TYPES.join(",")}
                      disabled={field.disabled}
                    />
                  )}
                />
              </label>
            </div>

            <CheckBox
              name="accept"
              value=""
              label="I Accept The Term Of Conditions And Privacy Policy"
              register={register}
            />
            {errors && (
              <p className="text-red-500 text-sm mt-1">
                {errors.accept?.message}
              </p>
            )}
          </div>
        </div>

        <NavButtons />
      </form>
    </motion.div>
  );
};

export default CoverLetterResume;
