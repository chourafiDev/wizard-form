import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import NavButtons from "../NavButtons";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import {
  setCurrentStep,
  setFormData,
  setMergeData,
} from "@/store/features/wizardFormSlice";
import {
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

  // set up hook form
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<TCoverLetterResumeShcema>({
    resolver: zodResolver(coverLetterResumeShcema),
    defaultValues: { ...formData },
  });

  const convertFileToBase64 = async (file: any) => {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          resolve(reader.result.split(",")[1]);
        } else {
          reject(new Error("Failed to convert file to base64."));
        }
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  // handle submit form
  const onSubmit = async (data: TCoverLetterResumeShcema) => {
    let newData = data;

    if (data.resume[0]) {
      const file = data.resume[0];
      const base64 = await convertFileToBase64(file);

      newData = { ...data, resume: base64 };
    }

    dispatch(setFormData(newData));
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
              {/* {errors.file && (
                <p className="text-red-500 text-sm ml-auto">
                  {errors?.file?.message}
                </p>
              )} */}
              <label
                className={`w-full bg-white border border-dashed ${
                  errors.resume ? "border-red-500" : "border-gray"
                } rounded-md p-4 flex justify-center items-center gap-3 cursor-pointer`}
              >
                <FiUploadCloud className="text-dark text-xl" />
                <span className="mt-2 text-base text-dark/70 leading-normal">
                  Select a file
                </span>
                <input
                  id="file-upload"
                  type="file"
                  className="sr-only"
                  {...register("resume")}
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
