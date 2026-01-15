"use client";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FromInput } from "@/components/reusable/form-input";
import SubTitle from "@/components/reusable/title";
import { EmailIcon, LockIcon } from "@/icon";
import Form from "@/components/reusable/from";
import { toast } from "sonner";
import { useVerifyEmailMutation, useSendVerificationCodeMutation } from "@/redux/api/authApi";
import { useAppDispatch } from "@/redux/hooks";
import { setUser } from "@/redux/features/authSlice";
import { helpers } from "@/lib/helpers";
import { authKey } from "@/lib/constants";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

// Define schema for verification code
import { z } from "zod";

const verificationSchema = z.object({
  verification_code: z
    .string()
    .nonempty("Verification code is required")
    .length(6, "Verification code must be 6 digits"),
});

export default function VerifyEmail() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const email = searchParams.get('email');
  const userId = searchParams.get('userId');
  const [verifyEmail, { isLoading: isVerifying }] = useVerifyEmailMutation();
  const [sendVerificationCode, { isLoading: isSendingCode }] = useSendVerificationCodeMutation();
  
  // Use combined loading state for the verify button
  const isLoading = isVerifying;

  const form = useForm({
    resolver: zodResolver(verificationSchema),
    defaultValues: {
      verification_code: "",
    },
  });

  const handleSubmit = async (values: FieldValues) => {
    try {
      const res = await verifyEmail({
        email: email || "",
        verification_code: values.verification_code
      }).unwrap();
      
      if (res?.access_token) {
        // Store the token in cookie
        helpers.setAuthCookie(authKey, res.access_token);
        
        // Store user info in Redux
        dispatch(setUser({
          name: res.user?.name || "",
          email: res.user?.email || "",
          role: res.user?.role || "customer",
          token: res.access_token,
        }));
        
        // Clear temporary storage
        localStorage.removeItem('registration_email');
        localStorage.removeItem('registration_user_id');
        
        // Redirect based on user role
        if (res.user?.role === 'vendor') {
          // Redirect vendors to document submission page for NID and business proof
          router.push('/auth/submit-documents');
        } else if (res.user?.role === 'admin') {
          router.push('/admin');
        } else {
          // Redirect customers to homepage with customer components
          router.push('/');
        }
        
        toast.success(res.message || "Email verified successfully!");
      }
    } catch (err: any) {
      console.error("Email verification error:", err);
      toast.error(err?.data?.message || "Verification failed");
    }
  };

  return (
    <div className="w-11/12 lg:max-w-4xl bg-secondary rounded-figma-sm p-5 lg:p-10 my-30 mx-auto">
      <SubTitle text="Verify Your Email" svg={false} />
      <p className="text-figma-secondary mt-2 mb-8">
        Please enter the 6-digit verification code sent to {email}
      </p>
      
      <Form className="space-y-4 pt-4" from={form} onSubmit={handleSubmit}>
        <FromInput
          className="h-11"
          name="verification_code"
          placeholder="Enter 6-digit code"
          icon={<LockIcon />}
          maxLength={6}
        />

        <div>
          <Button type="submit" className="w-full" size="lg" disabled={isVerifying}>
            {isVerifying ? "Verifying..." : "Verify Email"}
          </Button>
        </div>
      </Form>

      <div className="mt-8 space-y-4">
        <div className="text-center text-figma-secondary">
          Didn't receive the code?{" "}
          <button 
            type="button" 
            className="text-figma-primary hover:underline"
            onClick={async () => {
              // Resend verification code
              try {
                // Call the resend API with the email
                await sendVerificationCode({ email: email || "" }).unwrap();
                toast.success("Verification code resent successfully!");
              } catch (err: any) {
                console.error("Resend verification error:", err);
                toast.error(err?.data?.message || "Failed to resend verification code");
              }
            }}
            disabled={isSendingCode}
          >
            {isSendingCode ? "Sending..." : "Resend code"}
          </button>
        </div>
        
        <div className="text-center text-figma-secondary">
          Go back to{" "}
          <Link
            href="/auth"
            className="inline-flex items-center text-figma-primary hover:underline"
          >
            Login
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}