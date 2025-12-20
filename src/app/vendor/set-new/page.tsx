"use client";
import { SingleCalendar } from "@/components/reusable/date-box";
import { FromInput } from "@/components/reusable/form-input";
import ProgressChart from "@/components/reusable/progress-chart";
import { TableNoItem } from "@/components/reusable/table-no-item";
import { TableSkeleton } from "@/components/reusable/table-skeleton";
import { VendorTable } from "@/components/reusable/vendor-table";
import { Button, Label, TableCell, TableRow } from "@/components/ui";
import Form from "@/components/reusable/from";
import IconBox from "@/components/reusable/Icon-box";
import Modal2 from "@/components/reusable/modal2";
import SubTitle from "@/components/reusable/title";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";
import { CircleAlert, Plus, X } from "lucide-react";
import { useState } from "react";
import FavIcon from "@/favicon/favicon";
import { set_store } from "@/lib";
import FilePreviewDesign from "@/components/reusable/file-upload-design";

const data = [
  {
    title: "Marketing Campaign Performance",
    price: "$320",
    dateTime: "02nd Jan, 2025 at 10:15 AM",
    value: "88%",
  },
  {
    title: "Monthly Sales Target",
    price: "$540",
    dateTime: "15th Feb, 2025 at 03:40 PM",
    value: "92%",
  },
  {
    title: "Website Traffic Growth",
    price: "$180",
    dateTime: "27th Mar, 2025 at 08:20 PM",
    value: "76%",
  },
  {
    title: "Customer Retention Rate",
    price: "$450",
    dateTime: "09th Apr, 2025 at 11:55 AM",
    value: "81%",
  },
  {
    title: "New Subscribers Added",
    price: "$210",
    dateTime: "19th May, 2025 at 06:30 PM",
    value: "67%",
  },
  {
    title: "Returning User Activity",
    price: "$395",
    dateTime: "03rd Jun, 2025 at 02:45 PM",
    value: "90%",
  },
  {
    title: "Product Conversion Ratio",
    price: "$275",
    dateTime: "21st Jul, 2025 at 04:10 PM",
    value: "84%",
  },
  {
    title: "Engagement Rate Analysis",
    price: "$360",
    dateTime: "12th Aug, 2025 at 01:25 PM",
    value: "79%",
  },
  {
    title: "Daily Revenue Stats",
    price: "$620",
    dateTime: "30th Sep, 2025 at 09:05 AM",
    value: "93%",
  },
  {
    title: "Support Tickets Closed",
    price: "$150",
    dateTime: "18th Oct, 2025 at 07:50 PM",
    value: "71%",
  },
];

export default function SetNew() {
  const [isSet, setIsSet] = useState(false);
  const isLoading = false;
  return (
    <div className="container">
      <SubTitle
        className="my-10"
        text="Booking Target Management"
        svg={false}
      />
      <div className="bg-secondary p-4 rounded-md space-y-2 lg:space-y-0 flex flex-wrap items-center justify-between mb-10">
        <div className="bg-white flex flex-wrap items-center space-x-8 py-2  rounded-md w-fit px-2">
          <div className="flex items-center">
            <IconBox className="m-0">
              <FavIcon className="size-5" name="target_cc" />
            </IconBox>
            <div className="ml-2">
              <p>Current target</p>
              <p className="text-xl font-semibold">44</p>
            </div>
          </div>
          <div className="flex items-center">
            <FavIcon name="calender_cc" />
            <span className="text-figma-gray ml-1">15th Feb, 2025</span>
          </div>
          <ProgressChart stroke="#D9D9D9" progress={50} />
        </div>
        <Button onClick={() => setIsSet(!isSet)} className="rounded-sm">
          <Plus />
          Set New Target
        </Button>
      </div>
      <VendorTable headers={[]}>
        {isLoading ? (
          <TableSkeleton colSpan={3} tdStyle="!pl-2" />
        ) : data?.length > 0 ? (
          data?.map((item, index) => (
            <TableRow key={index} className="border">
              <TableCell>
                <div className="flex">
                  <IconBox className="m-0">
                    <FavIcon className="size-5" name="target_cc" />
                  </IconBox>
                  <div className="ml-2">
                    <p>{item.title}</p>
                    <p className="text-xl font-semibold">{item.price}</p>
                  </div>
                </div>
              </TableCell>

              <TableCell>
                <div className="flex items-center">
                  <FavIcon name="calender_cc" />
                  <span className="text-figma-gray ml-1">{item.dateTime}</span>
                </div>
              </TableCell>

              <TableCell>{item.value}</TableCell>
            </TableRow>
          ))
        ) : (
          <TableNoItem
            colSpan={3}
            title="No Order are available at the moment"
            tdStyle="!bg-background"
          />
        )}
      </VendorTable>
      {/*  ================= new add set ============= */}
      <Modal2
        open={isSet}
        setIsOpen={setIsSet}
        title="Set New Target"
        titleStyle="text-center"
        className="sm:max-w-lg"
      >
        <div
          onClick={() => setIsSet(false)}
          className="absolute cursor-pointer top-3 right-4"
        >
          <X />
        </div>
        <AddNewSet />
      </Modal2>
    </div>
  );
}

//  =====================  AddNewProduct ===============
function AddNewSet() {
  const form = useForm({
    // resolver: zodResolver(set_store),
    defaultValues: {
      title: "",
      price: "",
      date: "",
    },
  });

  const handleProfileSubmit = async (values: FieldValues) => {
    console.log("Submitted Data:", values);
  };

  const dateError = form.formState.errors?.date?.message as string;

  return (
    <Form from={form} className="space-y-6" onSubmit={handleProfileSubmit}>
      <FromInput
        label="Title"
        name="title"
        placeholder="Enter target title"
        className="h-11 rounded-xl bg-secondary placeholder:text-muted-foreground"
      />

      <FromInput
        label="Target"
        name="price"
        placeholder="Enter target amount"
        className="h-11 rounded-xl bg-secondary placeholder:text-muted-foreground"
        type="number"
      />

      <div>
        <Label className="text-black text-base font-medium mb-1">
          Expiry Date
        </Label>

        <SingleCalendar
          className="h-10 bg-secondary border-none"
          onChange={(value: any) => {
            form.setValue("date", value, { shouldValidate: true });
          }}
        />

        {dateError && (
          <p className="text-red-400 flex items-center justify-end gap-1 text-sm">
            {dateError} <CircleAlert size={14} />
          </p>
        )}
      </div>

      <Button size="lg" className="rounded-md w-full" type="submit">
        Set
      </Button>
    </Form>
  );
}
