import React from "react";
import { TPersonalInfoShcema, personalInfoShcema } from "@/libs/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import TextInput from "@/components/ui/TextInput";
import NavButtons from "../NavButtons";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { setCurrentStep, setFormData } from "@/store/features/wizardFormSlice";
import { motion } from "framer-motion";

const PersonalInfo = () => {
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
  } = useForm<TPersonalInfoShcema>({
    resolver: zodResolver(personalInfoShcema),
    defaultValues: { ...formData },
  });

  // handle submit form
  const onSubmit = async (data: TPersonalInfoShcema) => {
    dispatch(setFormData(data));
    dispatch(setCurrentStep(currentStep + 1));
  };

  return (
    <motion.div
      initial={{ opacity: 0, translateX: currentStep * 100 }}
      animate={{ opacity: 1, translateX: 0 }}
      exit={{ opacity: 0, translateX: -currentStep * 100 }}
      transition={{ duration: 0.5 }}
      className="h-full"
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-between h-full"
      >
        <div>
          <h1 className="font-semibold text-dark md:text-2xl text-xl">
            Personal information
          </h1>

          <div className="space-y-5 mt-8">
            <TextInput
              register={register}
              error={errors.fullName}
              type="text"
              name="fullName"
              label="Full Name"
              placeholder="e.g. Jhon milson"
            />

            <TextInput
              register={register}
              error={errors.email}
              type="email"
              name="email"
              label="Email Address"
              placeholder="e.g. Jhonmilson@lorem.com"
            />

            <TextInput
              register={register}
              error={errors.phoneNumber}
              type="text"
              name="phoneNumber"
              label="Phone  Number"
              placeholder="e.g +1 (234) 567-0890"
            />
          </div>
        </div>

        <NavButtons />
      </form>
    </motion.div>
  );
};

export default PersonalInfo;
