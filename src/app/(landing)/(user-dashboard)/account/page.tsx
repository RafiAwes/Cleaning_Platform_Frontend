"use client";

import { Button, Label } from "@/components/ui";
import {
  EmailInfIcon,
  LocationFieldIcon,
  PhoneIpfIcon,
  UserInfIcon,
} from "@/icon";

import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { booking_screma, PlaceholderImg } from "@/lib";
import Form from "@/components/reusable/from";
import { FromInput } from "@/components/reusable/form-input";
import { useFileUpload } from "@/hooks/useFileUpload";
import Image from "next/image";
import profile from "@/assets/profile.png";

const AccountSettings = () => {
  const [{ files }, { getInputProps }] = useFileUpload({
    accept: "image/*",
  });

  const from = useForm({
    resolver: zodResolver(booking_screma),
    defaultValues: {
      name: "",
      email: "",
      phone_number: "",
      address: "",
    },
  });

  const handleSubmit = async (values: FieldValues) => {
    const value = {
      values,
      ...(files[0]?.file && { image: files[0]?.file }),
    };

    console.log(value);
  };

  return (
    <div>
      <h1 className="text-xl font-semibold mb-6 ">Account settings</h1>
      <div>
        <Form from={from} onSubmit={handleSubmit}>
          <Label
            htmlFor="image"
            className="relative mx-auto size-28 rounded-full mb-6"
          >
            <Image
              src={files[0]?.preview || PlaceholderImg() || "/blur.png"}
              alt={"title"}
              fill
              className={"object-cover rounded-full"}
            />
            <div className="grid place-items-center shadow-md  rounded-full absolute bottom-0 -right-2 cursor-pointer">
              <picture>
                <img className="size-10" src={profile.src} alt="profile" />
              </picture>
            </div>
            <input
              {...getInputProps()}
              className="sr-only"
              aria-label="Upload image file"
              id="image"
            />
          </Label>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
            <FromInput
              label="Name"
              name="name"
              placeholder="Enter your full name here"
              icon={<UserInfIcon />}
              className="h-[50px]  bg-secondary  placeholder:text-muted-foreground"
              stylelabel="text-lg"
            />

            <FromInput
              label="Email"
              name="email"
              placeholder="Enter your email"
              icon={<EmailInfIcon />}
              className="h-[50px]  bg-secondary  placeholder:text-muted-foreground"
              stylelabel="text-lg"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <FromInput
              label="Phone number"
              name="phone_number"
              type="number"
              placeholder="Enter your phone number"
              icon={<PhoneIpfIcon />}
              className="h-[50px]  bg-secondary  placeholder:text-muted-foreground"
              stylelabel="text-lg"
            />

            <FromInput
              label="Address"
              name="address"
              placeholder="Enter your address"
              icon={<LocationFieldIcon />}
              className="h-[50px]  bg-secondary  placeholder:text-muted-foreground"
              stylelabel="text-lg"
            />
          </div>

          <div className="flex justify-end mt-4">
            <Button type="submit" className="">
              Save Changes
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default AccountSettings;
