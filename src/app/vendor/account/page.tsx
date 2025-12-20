"use client";
import { FieldValues, useForm } from "react-hook-form";
import { FromInput } from "@/components/reusable/form-input";
import { useFileUpload } from "@/hooks/useFileUpload";
import profile from "@/assets/profile.png";
import Form from "@/components/reusable/from";
import { Button, Input, Label } from "@/components/ui";
import FavIcon from "@/favicon/favicon";
import { PlaceholderImg } from "@/lib";
import Image from "next/image";
import { FromTextArea } from "@/components/reusable/from-textarea";

export default function Settings() {
  const [{ files }, { getInputProps, clearFiles }] = useFileUpload({
    accept: "image/*",
  });

  const profilefrom = useForm({
    defaultValues: {
      name: "admin",
      email: "admin@gmail.com",
      phone: "1234567890",
      address: "123 Main St",
      from: "12:00",
      to: "23:00",
    },
  });
  const handleProfileSubmit = async (values: FieldValues) => {
    const value = {
      name: values.name,
      ...(files[0]?.file && { image: files[0]?.file }),
    };
    // toast.success("Profile Updated", {
    //   description: "Your profile has been successfully updated",
    //   position: "bottom-right",
    // });
    console.log(value);
  };
  return (
    <Form
      from={profilefrom}
      className="space-y-6 pt-5 pb-8"
      onSubmit={handleProfileSubmit}
    >
      <Label htmlFor="image" className="relative mx-auto size-28 rounded-full">
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <FromInput
          label="Your full name"
          name="name"
          className="h-11 rounded-xl bg-secondary"
          icon={<FavIcon name="users_cc" className="size-5" />}
        />
        <FromInput
          label="Email address"
          name="email"
          className="h-11 rounded-xl  bg-secondary"
          icon={<FavIcon name="mail_cc" className="size-5" />}
          readOnly
        />
        <FromInput
          label="Phone number"
          name="phone"
          className="h-11 rounded-xl  bg-secondary"
          icon={<FavIcon name="phone_cc" className="size-5" />}
          readOnly
        />
        <FromInput
          label="Address"
          name="address"
          className="h-11 rounded-xl  bg-secondary"
          icon={<FavIcon name="location_cc" className="size-5" />}
          readOnly
        />
        <div className="col-span-1 lg:col-span-2">
          <FromTextArea
            placeholder="Write something about you"
            label="About you"
            name="about"
            className="min-h-30"
          />
        </div>
        <FromInput
          label="Available time From"
          name="from"
          className="h-11 rounded-xl bg-secondary"
          type="time"
        />
        <FromInput
          label="Available time To"
          name="to"
          className="h-11 rounded-xl bg-secondary"
          type="time"
        />
      </div>
      <div className="flex justify-end">
        <Button size="lg" className="rounded-md">
          Save Changes
        </Button>
      </div>
    </Form>
  );
}
