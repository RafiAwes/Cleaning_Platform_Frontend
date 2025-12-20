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

const businessCategories = [
  { value: "apartment cleaning", label: "Apartment cleaning" },
  { value: "deep cleaning", label: "Deep Cleaning" },
  { value: "air bnb", label: "Air BNB" },
  { value: "move in/move out cleaning", label: "Move In/Move Out cleaning" },
  { value: "move in/move out cleaninge", label: "Move In/Move Out cleaninge" },
  { value: "move in/move out cleanings", label: "Move In/Move Out cleanings" },
];

export default function VendorRegister() {
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

  const onSubmit = (values: any) => {
    console.log("Vendor Registration Data:", values);
    console.log("Selected business categories:", values.service_categories);
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

        <Link href={"/auth/submit-documents"}>
          <Button type="submit" className="w-full" size="lg">
            Next
          </Button>
        </Link>
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
