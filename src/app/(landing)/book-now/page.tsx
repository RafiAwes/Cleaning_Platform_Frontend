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
import { book_uc, register_vendor } from "@/lib";
import Form from "@/components/reusable/from";

const businessCategories = [
  { value: "apartment cleaning", label: "Apartment cleaning" },
  { value: "deep cleaning", label: "Deep Cleaning" },
  { value: "air bnb", label: "Air BNB" },
  { value: "move in/move out cleaning", label: "Move In/Move Out cleaning" },
  { value: "move in/move out cleaninge", label: "Move In/Move Out cleaninge" },
  { value: "move in/move out cleanings", label: "Move In/Move Out cleanings" },
];

const BookNowPage = () => {
  const form = useForm({
    resolver: zodResolver(book_uc),
    defaultValues: {
      service_categories: [],
    },
  });

  const onSubmit = (values: any) => {
    console.log("Vendor Registration Data:", values);
    console.log("Selected business categories:", values.service_categories);
  };

  return (
    <div className="my-10 lg:my-20">
      <div className="px-4">
        <div
          className={` bg-secondary rounded-[30px] md:rounded-[58px] py-4 md:py-10 lg:py-10 px-10  md:max-w-[600px] lg:max-w-[700px] xl:max-w-[1180px] mx-auto  flex flex-col justify-center items-center h-auto xl:h-[400px]`}
        >
          <div>
            <h1 className="text-[20px] lg:text-[28px] font-bold">
              What kind of service you want to book ?
            </h1>
            <Form from={form} onSubmit={onSubmit} className="space-y-6 pt-8">
              <FormSelect
                control={form.control}
                name="service_categories"
                placeholder="-select-"
                options={businessCategories}
                multiple={true}
                className="h-11"
              />

              <Link href={"/services"}>
                <Button size={"lg"} icon={true} className="w-full">
                  Search
                </Button>
              </Link>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookNowPage;
