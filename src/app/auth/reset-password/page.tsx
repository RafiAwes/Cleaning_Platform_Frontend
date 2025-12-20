"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Form from "@/components/reusable/from";
import { FromInput } from "@/components/reusable/form-input";
import { ChangeIcon, LockIcon } from "@/icon";
import SubTitle from "@/components/reusable/title";
import IconBox from "@/components/reusable/Icon-box";
import { new_Pass } from "@/lib";

export default function ResetPassword() {
  const router = useRouter();
  const from = useForm({
    resolver: zodResolver(new_Pass),
    defaultValues: {
      password: "",
      c_password: "",
    },
  });

  const handleSubmit = async (values: FieldValues) => {
    router.push(`/auth`);
    console.log(values);
  };
  return (
    <div className="w-11/12 lg:max-w-4xl bg-secondary rounded-figma-sm py-17 px-4  lg:px-10 my-30 mx-auto">
      <IconBox className="lg:size-14">
        <ChangeIcon className="lg:size-7" />
      </IconBox>
      <SubTitle text="Set new password" svg={false} />
      <p className="text-figma-secondary text-center mt-2">
        Set your new password here. It must be 8 characters and combination of
        special characters.
      </p>
      <Form className="space-y-4 pt-8" from={from} onSubmit={handleSubmit}>
        <FromInput
          className="h-11"
          name="password"
          placeholder="Password"
          icon={<LockIcon />}
        />
        <FromInput
          className="h-11"
          name="c_password"
          placeholder="Confirm password"
          icon={<LockIcon />}
        />

        <div>
          <Button className="w-full" size="lg">
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
}
