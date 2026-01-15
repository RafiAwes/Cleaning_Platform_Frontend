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
import { toast } from "sonner";

export default function Login() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [loginUser, { isLoading }] = useLoginInMutation();
  
  const from = useForm({
    resolver: zodResolver(sign_In),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (values: FieldValues) => {
    try {
      const res = await loginUser(values).unwrap();
      
      if (res?.access_token) {
        // Store the token in cookie
        helpers.setAuthCookie(authKey, res.access_token);
        
        // Store user info in Redux
        dispatch(setUser({
          name: res.user.name,
          email: res.user.email,
          role: res.user.role,
          token: res.access_token,
        }));
        
        // Redirect based on user role
        if (res.user.role === 'vendor') {
          // Check if vendor has uploaded documents by making an API call
          // Ensure the cookie is set before making the API call
          helpers.setAuthCookie(authKey, res.access_token);
          
          try {
            // Use axios directly to make the API call with the token
            const axios = (await import('axios')).default;
            
            const result = await axios.get('/vendor/document-status', {
              baseURL: process.env.NEXT_PUBLIC_API_URL,
              headers: {
                'Authorization': `Bearer ${res.access_token}`,
                'Accept': 'application/json',
              },
            });
            
            const docData = result.data;
            console.log('Document status response data:', docData);
            
            if (docData.has_documents) {
              // Documents exist, go to vendor dashboard
              console.log('Documents found, redirecting to /vendor');
              router.push('/vendor');
            } else {
              // No documents uploaded, go to document submission page
              console.log('No documents found, redirecting to /auth/submit-documents');
              router.push('/auth/submit-documents');
            }
          } catch (docErr: any) {
            // If there's an error checking document status, check the status code
            console.error('Document status check error:', docErr);
            
            // If it's a 401 or 403 error, it might mean the token wasn't accepted
            if (docErr.response?.status === 401 || docErr.response?.status === 403) {
              console.log('Authentication failed, redirecting to document upload');
              router.push('/auth/submit-documents');
            } else {
              // For other errors, also redirect to upload
              router.push('/auth/submit-documents');
            }
          }
        } else if (res.user.role === 'admin') {
          router.push('/admin');
        } else {
          router.push('/');
        }
        
        toast.success(res.message || "Login successful!");
      }
    } catch (err: any) {
      console.error("Login error:", err);
      toast.error(err?.data?.message || "Login failed");
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
          <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
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
