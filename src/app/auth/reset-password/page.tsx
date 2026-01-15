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
import { useResetPasswordMutation } from "@/redux/api/authApi";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

// Define schema for reset password
import { z } from "zod";

const resetPasswordSchema = z.object({
  email: z
    .string()
    .nonempty("Email is required")
    .email("Invalid email address"),
  token: z.string().nonempty("Reset token is required"),
  password: z
    .string()
    .nonempty("Password is required")
    .min(6, "Password must be at least 6 characters"),
  password_confirmation: z.string().nonempty("Password confirmation is required"),
}).refine((data) => data.password === data.password_confirmation, {
  message: "Passwords must match",
  path: ["password_confirmation"],
});

export default function ResetPassword() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const email = searchParams.get('email');
  
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const form = useForm({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: email || "",
      token: token || "",
      password: "",
      password_confirmation: "",
    },
  });

  const handleSubmit = async (values: FieldValues) => {
    try {
      const payload = {
        email: values.email,
        token: values.token,
        password: values.password,
        password_confirmation: values.password_confirmation,
      };
      
      const res = await resetPassword(payload).unwrap();
      
      toast.success(res.message || "Password reset successfully!");
      router.push('/auth');
    } catch (err: any) {
      console.error("Reset password error:", err);
      toast.error(err?.data?.message || "Failed to reset password");
    }
  };

  return (
    <div className="w-11/12 lg:max-w-4xl bg-secondary rounded-figma-sm p-5 lg:p-10 my-30 mx-auto">
      <SubTitle text="Reset Password" svg={false} />
      <p className="text-figma-secondary mt-2 mb-8">
        Enter your new password
      </p>
      
      <Form className="space-y-4 pt-4" from={form} onSubmit={handleSubmit}>
        <input type="hidden" name="token" defaultValue={token || ""} />
        
        <FromInput
          className="h-11"
          name="email"
          placeholder="Email"
          icon={<EmailIcon />}
          disabled
        />
        
        <FromInput
          className="h-11"
          name="password"
          type="password"
          placeholder="New password"
          icon={<LockIcon />}
          eye={true}
        />
        
        <FromInput
          className="h-11"
          name="password_confirmation"
          type="password"
          placeholder="Confirm new password"
          icon={<LockIcon />}
          eye={true}
        />

        <div>
          <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
            {isLoading ? "Resetting..." : "Reset Password"}
          </Button>
        </div>
      </Form>

      <div className="mt-8 space-y-4">
        <div className="text-center text-figma-secondary">
          Remember your password?{" "}
          <Link
            href="/auth"
            className="inline-flex items-center text-figma-primary hover:underline"
          >
            Back to login
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}