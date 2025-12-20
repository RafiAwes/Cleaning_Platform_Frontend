"use client";
import { FromInput } from "@/components/reusable/form-input";
import Form from "@/components/reusable/from";
import { Button, Label } from "@/components/ui";
import { useFileUpload } from "@/hooks/useFileUpload";
import { PlaceholderImg } from "@/lib";
import Image from "next/image";
import { FieldValues, useForm } from "react-hook-form";
import profile from "@/assets/profile.png";

export function EditStuff() {
  const [{ files }, { getInputProps, clearFiles }] = useFileUpload({
    accept: "image/*",
  });

  const form = useForm({
    defaultValues: {
      name: "",
      phone: "",
      address: "",
    },
  });

  const handleProfileSubmit = async (values: FieldValues) => {
    const value = {
      name: values.name,
      ...(files[0]?.file && { image: files[0]?.file }),
    };

    console.log("Submitted Data:", value);
  };

  return (
    <Form from={form} className="space-y-6" onSubmit={handleProfileSubmit}>
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
        label="Name"
        name="name"
        placeholder="Stuff name"
        className="h-11 rounded-xl bg-secondary placeholder:text-muted-foreground"
      />
      <FromInput
        label="Phone number"
        name="phone"
        placeholder="Stuff phone number"
        className="h-11 rounded-xl bg-secondary placeholder:text-muted-foreground [&::-webkit-inner-spin-button]:appearance-auto!"
        type="number"
      />
      <FromInput
        label="Address"
        name="address"
        placeholder="Stuff address"
        className="h-11 rounded-xl bg-secondary placeholder:text-muted-foreground"
      />

      <Button size="lg" className="rounded-md w-full" type="submit">
        Save Changes
      </Button>
    </Form>
  );
}
