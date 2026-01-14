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
import { useGetCategoriesQuery } from "@/redux/api/categoryApi";

const BookNowPage = () => {
  const { data: categoriesData, isLoading: isCategoriesLoading } = useGetCategoriesQuery(undefined);
  
  const form = useForm({
    resolver: zodResolver(book_uc),
    defaultValues: {
      service_categories: [],
    },
  });

  // Convert categories to options format when data is loaded
  const businessCategories = categoriesData?.data?.map((category: any) => ({
    value: category.id.toString(),
    label: category.name
  })) || [];

  const onSubmit = (values: any) => {
    console.log("Service booking Data:", values);
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
                placeholder={isCategoriesLoading ? "Loading..." : "-select-"}
                options={isCategoriesLoading ? [] : businessCategories}
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