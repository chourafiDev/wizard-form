import { z } from "zod";

export const personalInfoShcema = z.object({
  fullName: z.string().trim().min(2, { message: "Full name is required" }),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .min(1, { message: "Email address is required" })
    .email({
      message: "Must be a valid email",
    }),
  phoneNumber: z
    .string()
    .refine((value) => /^\+\d{1} \(\d{3}\) \d{3}\-\d{4}$/.test(value), {
      message: "Invalid phone number format.",
    }),
});

export const availabilityShcema = z.object({
  availability: z.string({ invalid_type_error: "Please select availability" }),
});

export const availabilityStatusShcema = z.object({
  minimumSalary: z
    .string()
    .min(1, { message: "Please select a minimum salary" }),
  availabilityLooking: z
    .string()
    .min(1, { message: "Please select an availability" }),
  remotely: z.string({ invalid_type_error: "Work remotely is required" }),
});

export const freelanceContractavailabilityShcema = z.object({
  fixedRate: z
    .string()
    .trim()
    .min(1, { message: "Minimum fixed rate is required" }),
  hourlyRate: z
    .string()
    .trim()
    .min(1, { message: "Minimum hourly rate is required" }),
  hours: z
    .string()
    .trim()
    .min(1, { message: "Minimum hours for a contract is required" }),
  freelanceContractRemotely: z.string({
    invalid_type_error: "Work remotely is required",
  }),
});

export const workExperianceShcema = z.object({
  workExperiance: z
    .string()
    .min(1, { message: "Please select a work experiance" }),
  githubUrl: z
    .string()
    .url()
    .includes("github.com", { message: "Invalid GitHub URL" }),
});

const isValidFile = (value: string) => {
  const allowedExtensions = ["pdf", "doc", "docx"];
  const fileExtension = value?.split(".")?.pop()?.toLowerCase() as string;
  return allowedExtensions.includes(fileExtension);
};

export const coverLetterResumeShcema = z.object({
  coverLatter: z
    .string()
    .trim()
    .min(10, { message: "Cover Letter is required" }),
  // fileUpload: z.string().optional(),
  // file: z.string().optional(),
  accept: z.boolean().refine((value) => value === true, {
    message: "Accept conditions is required",
  }),
});

export type TPersonalInfoShcema = z.infer<typeof personalInfoShcema>;
export type TAvailabilityShcema = z.infer<typeof availabilityShcema>;
export type TAvailabilityStatusShcema = z.infer<
  typeof availabilityStatusShcema
>;
export type TFreelanceContractavailabilityShcema = z.infer<
  typeof freelanceContractavailabilityShcema
>;
export type TWorkExperianceShcema = z.infer<typeof workExperianceShcema>;
export type TCoverLetterResumeShcema = z.infer<typeof coverLetterResumeShcema>;
