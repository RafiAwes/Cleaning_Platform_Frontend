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
import { useLoginInMutation } from "@/redux/api/authApi";
import { helpers } from "@/lib/helpers";
import { authKey } from "@/lib/constants";
import { ResponseApiErrors } from "@/lib/api-response";

export default function Login() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [login, { isLoading }] = useLoginInMutation();
  const from = useForm({
    resolver: zodResolver(sign_In),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (values: FieldValues) => {
    try {
      const res: any = await login(values).unwrap();

      // Handle various possible API response formats
      let token = res?.token || res?.access_token || res?.data?.token || res?.data?.access_token;
      let user = res?.user || res?.data?.user || {};

      // If user is still empty, check if user data is directly in the response
      if (!user.name && !user.email && !user.role && res && typeof res === 'object') {
        // Try to extract user data from top-level properties
        user = {
          name: res.name || res.full_name || res.first_name,
          email: res.email,
          role: res.role || res.user_role || res.userType,
        };
      }

      if (token) {
        helpers.setAuthCookie(authKey, token);
        // Also store user info in localStorage as backup
        helpers.setStorageItem("auth_user", JSON.stringify({
          name: user.name,
          email: user.email,
          role: user.role,
        }));
      }

      const userData = {
        name: user.name,
        email: user.email,
        role: user.role,
        token,
      };

      dispatch(setUser(userData));

      // Normalize role to lowercase for comparison
      const normalizedRole = (user.role || '').toLowerCase();

      // Redirect based on user role
      if (normalizedRole === "admin") {
        router.push("/admin");
      } else if (normalizedRole === "vendor") {
        router.push("/vendor");
      } else {
        // For customer or any other user role, redirect to home
        router.push("/");
      }
    } catch (error: unknown) {
      const apiError = error as any;
      const errorData = apiError?.data;

      console.error("Login error status:", apiError?.status);
      console.error("Login error data:", errorData);

      // Prefer server validation messages when available
      ResponseApiErrors(errorData, from);

      const message =
        errorData?.message ||
        errorData?.error ||
        errorData?.msg ||
        "Login failed. Please check your credentials and try again.";

      console.error("Login failed with message:", message);
      alert(message);
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
          <Button className="w-full" size="lg" type="submit" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Login"}
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
