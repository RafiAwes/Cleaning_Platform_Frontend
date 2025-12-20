"use client";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Form from "@/components/reusable/from";
import { FromInput } from "@/components/reusable/form-input";
import { QuestionIcon, ResetIcon } from "@/icon";
import SubTitle from "@/components/reusable/title";
import IconBox from "@/components/reusable/Icon-box";
import { varify_sc } from "@/lib";
import { Suspense } from "react";

function VarifyCodeChild() {
  const params = useSearchParams();
  const email = params?.get("email");
  const router = useRouter();
  const from = useForm({
    resolver: zodResolver(varify_sc),
    defaultValues: {
      code: "",
    },
  });

  const handleSubmit = async (values: FieldValues) => {
    router.push(`/auth/reset-password?email=${email}&otp=${values.code}`);
    console.log(values);
  };
  return (
    <div className="w-11/12 lg:max-w-4xl bg-secondary rounded-figma-sm py-17 px-4  lg:px-10 my-30 mx-auto">
      <IconBox className="lg:size-14">
        <QuestionIcon className="lg:size-7" />
      </IconBox>
      <SubTitle text="Verify code" svg={false} />
      <p className="text-figma-secondary text-center max-w-md mx-auto mt-2">
        {`We&apos;ve sent you a 6 digit code to ${email}. Please
        verify that code to change your password.`}
      </p>
      <Form className="space-y-4 pt-8" from={from} onSubmit={handleSubmit}>
        <FromInput className="h-11" name="code" placeholder="Enter code here" />

        <div>
          <Button className="w-full" size="lg">
            Verify
          </Button>
        </div>
      </Form>

      <div className="text-figma-secondary cursor-pointer flex items-center justify-center mt-5 space-x-2">
        <ResetIcon />
        <span className="ml-1"> Resend code</span>
      </div>
    </div>
  );
}

export default function VerifyCode() {
  return (
    <Suspense>
      <VarifyCodeChild />
    </Suspense>
  );
}
