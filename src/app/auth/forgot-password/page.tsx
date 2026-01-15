"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FromInput } from "@/components/reusable/form-input";
import SubTitle from "@/components/reusable/title";
import { EmailIcon } from "@/icon";
import Form from "@/components/reusable/from";
import { toast } from "sonner";
import { useForgotPasswordMutation } from "@/redux/api/authApi";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

// Define schema for email
import { z } from "zod";

const forgotPasswordSchema = z.object({
  email: z
    .string()
    .nonempty("Email is required")
    .email("Invalid email address"),
});

export default function ForgotPassword() {
  const router = useRouter();
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const form = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const handleSubmit = async (values: FieldValues) => {
    try {
      const res = await forgotPassword(values).unwrap();
      
      toast.success(res.message || "Password reset link sent to your email!");
      router.push('/auth');
    } catch (err: any) {
      console.error("Forgot password error:", err);
      toast.error(err?.data?.message || "Failed to send password reset link");
    }
  };

  return (
    <div className="w-11/12 lg:max-w-4xl bg-secondary rounded-figma-sm p-5 lg:p-10 my-30 mx-auto">
      <SubTitle text="Forgot Password" svg={false} />
      <p className="text-figma-secondary mt-2 mb-8">
        Enter your email address and we'll send you a link to reset your password
      </p>
      
      <Form className="space-y-4 pt-4" from={form} onSubmit={handleSubmit}>
        <FromInput
          className="h-11"
          name="email"
          placeholder="Enter your email"
          icon={<EmailIcon />}
        />

        <div>
          <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
            {isLoading ? "Sending..." : "Send Reset Link"}
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