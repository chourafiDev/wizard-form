import { z } from "zod";

export const MAX_FILE_SIZE = 2 * 1024 * 1024;
export const ACCEPTED_FILE_TYPES = [
  "image/jpeg",
  "image/png",
  "application/pdf",
];

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
  availability: z.enum(
    [
      "full time availability",
      "part time availability",
      "freelancer / Contract availability",
    ],
    {
      errorMap: () => ({ message: "Please select availability." }),
    }
  ),
});

export const availabilityStatusShcema = z.object({
  minimumSalary: z
    .string()
    .min(1, { message: "Please select a minimum salary" }),
  availabilityLooking: z
    .string()
    .min(1, { message: "Please select an availability" }),
  remotely: z.enum(["morning", "afternoon", "no preferences"], {
    errorMap: () => ({ message: "Please select availability." }),
  }),
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
  experiances: z.array(z.string()).nonempty({
    message: "You have to select at least one field.",
  }),
  // .refine((value) => value.some((item) => item), {
  //   message: "You have to select at least one item.",
  // }),
});

export const coverLetterResumeShcema = z.object({
  coverLatter: z
    .string()
    .trim()
    .min(10, { message: "Cover Letter is required" }),
  resume: z
    .instanceof(FileList, { message: "Resume is required." })
    .refine((fileList) => fileList.length > 0, {
      message: "Resume is required.",
    })
    .refine((fileList) => fileList[0]?.size <= MAX_FILE_SIZE, {
      message: "The file size must be less than 2MB.",
    })
    .refine((fileList) => ACCEPTED_FILE_TYPES.includes(fileList[0].type), {
      message: "Invalid file type.",
    }),
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
