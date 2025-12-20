"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Form from "@/components/reusable/from";
import { FromInput } from "@/components/reusable/form-input";
import { EmailIcon, GoogleIcon, LockIcon } from "@/icon";
import SubTitle from "@/components/reusable/title";
import { Checkbox, Label } from "@/components/ui";
import { sign_In } from "@/lib";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import IconBox from "@/components/reusable/Icon-box";
import { useAppDispatch } from "@/redux/hooks";
import { setUser } from "@/redux/features/authSlice";

export default function Login() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const from = useForm({
    resolver: zodResolver(sign_In),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (values: FieldValues) => {
    if (values.email == "user@gmail.com") {
      dispatch(
        setUser({
          name: "John Doe",
          email: values.email,
          role: "user",
        })
      );
      router.push("/");
    } else if (values.email == "vendor@gmail.com") {
      router.push("/vendor");
      dispatch(
        setUser({
          name: "John Doe",
          email: values.email,
          role: "vendor",
        })
      );
    } else if (values.email == "admin@gmail.com") {
      router.push("/admin");
      dispatch(
        setUser({
          name: "John Doe",
          email: values.email,
          role: "admin",
        })
      );
    }
  };
  return (
    <div className="w-11/12 lg:max-w-4xl bg-secondary rounded-figma-sm p-4 lg:p-10 my-30 mx-auto">
      <SubTitle text="Login" svg={false} />
      <Form className="space-y-4 pt-8" from={from} onSubmit={handleSubmit}>
        <FromInput
          className="h-11"
          name="email"
          placeholder="Email"
          icon={<EmailIcon />}
        />

        <div>
          <FromInput
            className="h-11"
            name="password"
            placeholder="Password"
            eye={true}
            icon={<LockIcon />}
          />

          <div className="flex items-center justify-between mt-2 text-sm">
            <div className="flex items-center space-x-2">
              <Checkbox id="remember-me" />
              <Label htmlFor="remember-me" className="font-normal">
                Keep me logged in
              </Label>
            </div>
            <Link href="/auth/forgot-password" className="hover:underline">
              Forgot Password ?
            </Link>
          </div>
        </div>

        <div>
          <Button className="w-full" size="lg">
            {" "}
            Login
          </Button>
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
        <IconBox>
          <GoogleIcon />
        </IconBox>
        <div className="text-center  text-figma-secondary">
          New here ?{" "}
          <Link
            href="/auth/register"
            className="inline-flex items-center text-figma-secondary hover:underline"
          >
            Register your account
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
