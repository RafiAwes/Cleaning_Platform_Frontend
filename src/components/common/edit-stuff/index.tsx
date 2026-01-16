"use client";
import { FromInput } from "@/components/reusable/form-input";
import Form from "@/components/reusable/from";
import { Button, Label } from "@/components/ui";
import { useFileUpload } from "@/hooks/useFileUpload";
import { PlaceholderImg } from "@/lib";
import Image from "next/image";
import { FieldValues, useForm } from "react-hook-form";
import profile from "@/assets/profile.png";
import { useUpdateCleanerMutation } from "@/redux/api/vendorApi";
import { toast } from "sonner";
import { useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface EditStuffProps {
  cleaner: any;
  onSuccess?: () => void;
}

export function EditStuff({ cleaner, onSuccess }: EditStuffProps) {
  const [{ files }, { getInputProps, clearFiles }] = useFileUpload({
    accept: "image/*",
  });

  const form = useForm({
    defaultValues: {
      name: cleaner?.name || "",
      phone: cleaner?.phone || "",
      address: cleaner?.address || "",
      status: cleaner?.status || "active",
    },
  });

  const [updateCleaner, { isLoading }] = useUpdateCleanerMutation();

  useEffect(() => {
    if (cleaner) {
      form.reset({
        name: cleaner.name || "",
        phone: cleaner.phone || "",
        address: cleaner.address || "",
        status: cleaner.status || "active",
      });
    }
  }, [cleaner, form]);

  const handleProfileSubmit = async (values: FieldValues) => {
    if (!cleaner?.id) return;

    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("phone", values.phone);
    if (values.address) {
      formData.append("address", values.address);
    }
    formData.append("status", values.status || "active");
    if (files[0]?.file) {
      formData.append("image", files[0].file);
    }

    try {
      await updateCleaner({ id: cleaner.id, formData }).unwrap();
      toast.success("Staff updated successfully");
      clearFiles();
      onSuccess?.();
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to update staff");
    }
  };

  return (
    <Form from={form} className="space-y-6" onSubmit={handleProfileSubmit}>
      <Label htmlFor="image" className="relative mx-auto size-28 rounded-full">
        <Image
          src={files[0]?.preview || cleaner?.image || PlaceholderImg() || "/blur.png"}
          alt={cleaner?.name || "title"}
          fill
          className={"object-cover rounded-full"}
        />
        <div className="grid place-items-center shadow-md rounded-full absolute bottom-0 -right-2 cursor-pointer">
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
        placeholder="Staff name"
        className="h-11 rounded-xl bg-secondary placeholder:text-muted-foreground"
      />
      <FromInput
        label="Phone number"
        name="phone"
        placeholder="Staff phone number"
        className="h-11 rounded-xl bg-secondary placeholder:text-muted-foreground"
      />
      <FromInput
        label="Address"
        name="address"
        placeholder="Staff address"
        className="h-11 rounded-xl bg-secondary placeholder:text-muted-foreground"
      />

      <div className="space-y-2">
        <Label htmlFor="status">Status</Label>
        <Select
          value={form.watch("status")}
          onValueChange={(value) => form.setValue("status", value)}
        >
          <SelectTrigger className="h-11 rounded-xl bg-secondary">
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="assigned">Assigned</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button 
        size="lg" 
        className="rounded-md w-full" 
        type="submit"
        disabled={isLoading}
      >
        {isLoading ? "Saving..." : "Save Changes"}
      </Button>
    </Form>
  );
}
