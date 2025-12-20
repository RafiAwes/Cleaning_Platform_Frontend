"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Form from "@/components/reusable/from";
import { FromInput } from "@/components/reusable/form-input";
import { EmailIcon, QuestionIcon } from "@/icon";
import SubTitle from "@/components/reusable/title";
import IconBox from "@/components/reusable/Icon-box";
import { sign_In } from "@/lib";

export default function ForgotPassword() {
  const router = useRouter();
  const from = useForm({
    resolver: zodResolver(sign_In.partial()),
    defaultValues: {
      email: "",
    },
  });

  const handleSubmit = async (values: FieldValues) => {
    router.push(`/auth/verify-code?email=${values.email}`);
    console.log(values);
  };
  return (
    <div className="w-11/12 lg:max-w-4xl bg-secondary rounded-figma-sm py-17 px-4  lg:px-10 my-30 mx-auto">
      <IconBox className="lg:size-14">
        <QuestionIcon className="lg:size-7" />
      </IconBox>
      <SubTitle text="Forgot password ?" svg={false} />
      <p className="text-figma-secondary text-center mt-2">
        Enter your email and we will send you a code to reset your password
      </p>
      <Form className="space-y-4 pt-8" from={from} onSubmit={handleSubmit}>
        <FromInput
          className="h-11"
          name="email"
          placeholder="Email"
          icon={<EmailIcon />}
        />

        <div>
          <Button className="w-full" size="lg">
            {" "}
            Send code
          </Button>
        </div>
      </Form>
    </div>
  );
}
