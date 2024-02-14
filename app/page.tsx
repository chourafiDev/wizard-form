import StepForm from "@/components/MultiStepForm/StepForm";
import Steps from "@/components/MultiStepForm/Steps";

export default function Home() {
  return (
    <main className="bg-white lg:h-screen h-full flex gap-16">
      <Steps />

      <StepForm />
    </main>
  );
}
