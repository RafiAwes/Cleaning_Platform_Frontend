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
import { useOtpVarifyMutation } from "@/redux/api/authApi";
import { helpers } from "@/lib/helpers";
import { setUser } from "@/redux/features/authSlice";
import { useAppDispatch } from "@/redux/hooks";

function VarifyCodeChild() {
  const params = useSearchParams();
  const email = params?.get("email");
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [verifyOtp, { isLoading: isVerifying }] = useOtpVarifyMutation();
  
  const from = useForm({
    resolver: zodResolver(varify_sc),
    defaultValues: {
      code: "",
    },
  });

  const handleSubmit = async (values: FieldValues) => {
    try {
      // Verify the email and get the token
      const result = await verifyOtp({
        email: email,
        verification_code: values.code
      }).unwrap();
      
      // Store the authentication token received from the backend
      if (result.access_token) {
        // Store the token using the proper helper function (uses cookies)
        helpers.setAuthCookie('auth_token', result.access_token);
        
        // Update the Redux store with user information
        if (result.user) {
          dispatch(setUser({
            name: result.user.name,
            email: result.user.email,
            role: result.user.role,
            token: result.access_token
          }));
        }
      }
      
      alert(result.message || 'Email verified successfully');
      router.push("/auth/submit-documents");
    } catch (error: any) {
      console.error("Verification failed", error);
      if (error?.data?.message) {
        alert(error.data.message);
      } else {
        alert("Verification failed. Please check your code and try again.");
      }
    }
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
          <Button className="w-full" size="lg" type="submit" disabled={isVerifying}>
            {isVerifying ? "Processing..." : "Verify"}
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