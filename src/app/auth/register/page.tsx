"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FromInput } from "@/components/reusable/form-input";
import { EmailIcon, GoogleIcon, LockIcon, UserIcon } from "@/icon";
import Form from "@/components/reusable/from";
import SubTitle from "@/components/reusable/title";
import { ArrowRight } from "lucide-react";
import { register_sc } from "@/lib";
import Link from "next/link";

export default function Login() {
  const router = useRouter();
  const from = useForm({
    resolver: zodResolver(register_sc),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      c_password: "",
    },
  });

  const handleSubmit = async (values: FieldValues) => {
    console.log(values);
  };
  return (
    <div className="w-11/12 lg:max-w-4xl bg-secondary rounded-figma-sm p-5 lg:p-10 my-30 mx-auto">
      <SubTitle text="User Registration" svg={false} />
      <Form className="space-y-4 pt-8" from={from} onSubmit={handleSubmit}>
        <FromInput
          className="h-11"
          name="name"
          placeholder="Your full name"
          icon={<UserIcon />}
        />
        <FromInput
          className="h-11"
          name="email"
          placeholder="Email"
          icon={<EmailIcon />}
        />

        <FromInput
          className="h-11"
          name="password"
          placeholder="Password"
          eye={true}
          icon={<LockIcon />}
        />
        <FromInput
          className="h-11"
          name="c_password"
          placeholder="Confirm password"
          eye={true}
          icon={<LockIcon />}
        />

        <div>
          <Link href={"/auth"}>
            <Button className="w-full" size="lg">
              {" "}
              Create account
            </Button>
          </Link>
        </div>
      </Form>

      <div className="space-y-4 mt-10">
        <div className="relative mt-1">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-gray-200" />
          </div>
          <div className="relative flex justify-center ">
            <span className="px-2 bg-secondary text-figma-secondary">
              or login with
            </span>
          </div>
        </div>
        <div className="size-11 cursor-pointer grid bg-white mx-auto  place-items-center rounded-full">
          <GoogleIcon />
        </div>
        <div className="text-center  text-figma-secondary">
          Already have an account ? {"  "}
          <Link
            href="/auth"
            className="inline-flex items-center text-figma-secondary hover:underline"
          >
            {" "}
            Login here
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
