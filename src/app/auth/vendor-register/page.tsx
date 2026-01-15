"use client";

import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FromInput } from "@/components/reusable/form-input";

import { FormSelect } from "@/components/reusable/select/form-select";
import SubTitle from "@/components/reusable/title";
import {
  BusinessIcon,
  EmailIcon,
  GoogleIcon,
  LocationFieldIcon,
  LockIcon,
  UserIcon,
} from "@/icon";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { register_vendor } from "@/lib";
import Form from "@/components/reusable/from";
import { useRegisterMutation } from "@/redux/api/authApi";
import { useGetCategoriesQuery } from "@/redux/api/categoryApi";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function VendorRegister() {
  const router = useRouter();
  const [registerUser, { isLoading }] = useRegisterMutation();
  const { data: categoriesData, isLoading: categoriesLoading, isError, error } = useGetCategoriesQuery(undefined);
  
  // Log any errors
  if (isError) {
    console.error("Error loading categories:", error);
  }
  
  const form = useForm({
    resolver: zodResolver(register_vendor),
    defaultValues: {
      name: "",
      business_name: "",
      service_categories: [],
      address: "",
      email: "",
      password: "",
      c_password: "",
    },
  });

  // Transform categories data for the select component
  const businessCategories = categoriesData?.data && Array.isArray(categoriesData.data) 
    ? categoriesData.data.map((category: any) => ({
        value: category.id?.toString() || "",
        label: category.name || ""
      })) 
    : [];
  
  // Log for debugging
  if (categoriesLoading) {
    console.log("Loading categories...");
  } else if (categoriesData) {
    console.log("Categories loaded:", categoriesData);
    console.log("Transformed categories:", businessCategories);
  } else {
    console.log("No categories data available");
  }

  const onSubmit = async (values: any) => {
    try {
      const userData = {
        name: values.name,
        email: values.email,
        password: values.password,
        password_confirmation: values.c_password,
        role: "vendor",
        business_name: values.business_name,
        address: values.address,
        service_categories: values.service_categories.map((cat: string) => parseInt(cat))
      };

      const res = await registerUser(userData).unwrap();
      
      // Check if it's a vendor registration (has 'user' object) or customer registration (has 'user_id')
      const userId = res.user?.id || res.user_id;
      
      if (userId) {
        // Store user info temporarily for verification step
        localStorage.setItem('registration_email', values.email);
        localStorage.setItem('registration_user_id', userId.toString());
        
        toast.success(res.message || "Vendor registration successful!");
        router.push(`/auth/verify-email?email=${values.email}&userId=${userId}`);
      } else {
        // Handle case where response format is unexpected
        toast.error("Unexpected response format from server");
        console.error("Unexpected response format:", res);
      }
    } catch (err: any) {
      console.error("Vendor registration error:", err);
      toast.error(err?.data?.message || "Vendor registration failed");
    }
  };

  return (
    <div className="w-11/12 lg:max-w-4xl bg-secondary rounded-figma-sm p-5 lg:p-10 my-30 mx-auto">
      <SubTitle text="Vendor Registration" svg={false} />

      <Form from={form} onSubmit={onSubmit} className="space-y-6 pt-8">
        <FromInput
          className="h-11"
          name="name"
          placeholder="Your full name"
          icon={<UserIcon />}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FromInput
            className="h-11"
            name="business_name"
            placeholder="Your business name"
            icon={<BusinessIcon />}
          />

          {!categoriesLoading && businessCategories.length > 0 ? (
            <FormSelect
              control={form.control}
              name="service_categories"
              icon={<BusinessIcon />}
              iconSize={24}
              placeholder="-select your service-"
              options={businessCategories}
              multiple={true}
              className="h-11"
            />
          ) : (
            <div className="h-11 flex items-center justify-center bg-gray-100 rounded-md text-gray-500">
              Loading categories...
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FromInput
            className="h-11"
            name="address"
            placeholder="Your address"
            icon={<LocationFieldIcon />}
          />
          <FromInput
            className="h-11"
            name="email"
            placeholder="Email"
            icon={<EmailIcon />}
          />
        </div>

        <FromInput
          className="h-11"
          name="password"
          type="password"
          placeholder="Password"
          eye={true}
          icon={<LockIcon />}
        />
        <FromInput
          className="h-11"
          name="c_password"
          type="password"
          placeholder="Confirm password"
          eye={true}
          icon={<LockIcon />}
        />

        {isError && (
          <div className="text-red-500 text-center mb-4">
            Error loading service categories. Please try again later.
          </div>
        )}
        {categoriesLoading ? (
          <div className="text-center mb-4">
            Loading service categories...
          </div>
        ) : businessCategories.length === 0 && !categoriesLoading ? (
          <div className="text-center mb-4 text-orange-500">
            No service categories available. Please contact support.
          </div>
        ) : null}
        <Button type="submit" className="w-full" size="lg" disabled={isLoading || categoriesLoading}>
          {isLoading ? "Creating account..." : "Create Vendor Account"}
        </Button>
      </Form>

      {/* Social login section */}
      <div className="mt-10 space-y-4">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-gray-200" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-secondary px-2 text-figma-secondary">
              or continue with
            </span>
          </div>
        </div>

        <div className="mx-auto size-11 grid place-items-center rounded-full border bg-white cursor-pointer">
          <GoogleIcon />
        </div>

        <p className="text-center text-figma-secondary">
          Already have an account?{" "}
          <Link
            href="/auth"
            className="inline-flex items-center font-medium hover:underline"
          >
            Login here <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </p>
      </div>
    </div>
  );
}
