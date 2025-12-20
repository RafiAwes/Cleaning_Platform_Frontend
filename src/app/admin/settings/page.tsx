"use client";
import { FieldValues, useForm } from "react-hook-form";
import { FromInput } from "@/components/reusable/form-input";
import { useFileUpload } from "@/hooks/useFileUpload";
import profile from "@/assets/profile.png";
import Form from "@/components/reusable/from";
import { Button, Label } from "@/components/ui";
import FavIcon from "@/favicon/favicon";
import { PlaceholderImg } from "@/lib";
import Image from "next/image";

export default function Settings() {
  const [{ files }, { getInputProps, clearFiles }] = useFileUpload({
    accept: "image/*",
  });

  const profilefrom = useForm({
    defaultValues: {
      name: "admin",
      email: "admin@gmail.com",
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

      <FromInput
        name="name"
        className="h-11 rounded-xl bg-secondary"
        icon={<FavIcon name="users_cc" className="size-5" />}
      />
      <FromInput
        name="email"
        className="h-11 rounded-xl  bg-secondary"
        icon={<FavIcon name="mail_cc" className="size-5" />}
        readOnly
      />
      <div className="flex justify-end">
        <Button size="lg" className="rounded-md">
          Save Changes
        </Button>
      </div>
    </Form>
  );
}
