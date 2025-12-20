"use client";
import { FieldValues, useForm } from "react-hook-form";
import { FromInput } from "@/components/reusable/form-input";
import { useFileUpload } from "@/hooks/useFileUpload";
import { Button, Input, Label } from "@/components/ui";
import { FromTextArea } from "@/components/reusable/from-textarea";
import FilePreviewDesign from "@/components/reusable/file-upload-design";
import FromDropdown from "@/components/reusable/from-dropdown";
import { DeleteBtn } from "@/components/reusable/btn";
import Form from "@/components/reusable/from";
import { useState } from "react";
import { CircleAlert, Plus } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { package_store } from "@/lib";

export default function PackageEdit() {
  const [isItem, setIsItem] = useState<any>(["service1", "service2"]);
  const [addons, setAddons] = useState<any>([
    // { id: 1, name: "Sample Addon", price: 50 },
  ]);

  const suggestedAddons = [
    { id: 1, name: "Add-on number 1" },
    { id: 2, name: "Add-on number 2" },
    { id: 3, name: "Add-on number 3" },
    { id: 4, name: "Add-on number 4" },
  ];

  const form = useForm({
    resolver: zodResolver(package_store),
    defaultValues: {
      image: null,
      title: "",
      price: "",
      about: "",
      services: [],
    },
  });

  const [{ files }, { getInputProps, clearFiles, openFileDialog }] =
    useFileUpload({
      accept: "image/*",
      onFilesChange: (files) => {
        form.setValue("image", files[0]?.file);
      },
    });

  const handleSubmit = async (values: FieldValues) => {
    const value = {
      name: values.name,
      ...(files[0]?.file && { image: files[0]?.file }),
      addons,
    };

    console.log(values);
  };

  // Update addon fields
  const updateAddon = (id: any, key: string, value: any) => {
    setAddons(
      addons.map((a: any) => (a.id === id ? { ...a, [key]: value } : a))
    );
  };

  // Remove addon
  const removeAddon = (id: any) => {
    setAddons(addons.filter((a: any) => a.id !== id));
  };

  return (
    <div className="container">
      <Form from={form} className="space-y-6 mt-16" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          {/* Image Upload */}
          <div>
            <FilePreviewDesign
              className="h-[300px]"
              title="Upload Package Cover Photo"
              getInputProps={getInputProps}
              files={files}
              openFileDialog={openFileDialog}
            />
            {form?.watch("image") == null && form?.formState?.errors?.image && (
              <p className="text-reds flex mt-2 text-red-400 justify-end  items-center gap-1 text-sm">
                {form?.formState?.errors?.image?.message as string}
                <CircleAlert size={14} />
              </p>
            )}
          </div>

          {/* Right Section */}
          <div className="space-y-6">
            <FromInput
              label="Package Title"
              name="title"
              placeholder="Enter Package Title"
              className="h-11 rounded-xl bg-secondary"
            />

            <FromInput
              label="Package Price"
              name="price"
              placeholder="00"
              className="h-11 rounded-xl bg-secondary"
              type="number"
            />

            <FromTextArea
              label="About this Package"
              name="about"
              placeholder="Enter Package About"
              className="rounded-xl min-h-30 bg-secondary"
            />

            {/* Dropdown */}
            <div>
              <FromDropdown
                options={isItem}
                className="pb-2 px-1"
                label="Service Included"
                onChange={(values) => {
                  setIsItem(values);
                  form.setValue("services", values as any);
                }}
              />
              {form?.watch("services")?.length == 0 &&
                form?.formState?.errors?.services && (
                  <p className="text-reds justify-end flex items-center text-red-400 gap-1 text-sm">
                    {" "}
                    {form?.formState?.errors?.services?.message as string}{" "}
                    <CircleAlert size={14} />{" "}
                  </p>
                )}
            </div>

            {/* Add-ons Section */}
            {addons.length > 0 && (
              <div>
                <Label className="text-black text-base font-medium mb-2">
                  Add-ons
                </Label>
                <div className="space-y-2">
                  {addons.map((item: any) => (
                    <div key={item.id} className="flex items-center space-x-2">
                      {/* Name */}
                      <Input
                        className="h-11"
                        value={item.name}
                        onChange={(e) =>
                          updateAddon(item.id, "name", e.target.value)
                        }
                      />

                      {/* Price */}
                      <Input
                        type="number"
                        placeholder="price"
                        className="h-11 w-[100px]"
                        value={item.price}
                        onChange={(e) =>
                          updateAddon(item.id, "price", e.target.value)
                        }
                      />

                      {/* Delete Button */}
                      <DeleteBtn
                        className="size-12"
                        onClick={() => removeAddon(item.id)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Suggested Add-ons */}
            <div>
              <Label className="text-black text-base font-medium mb-2">
                Suggested Add Ons
              </Label>

              <div className="flex items-center flex-wrap gap-4">
                {suggestedAddons.map((item) => (
                  <div
                    onClick={() =>
                      setAddons([
                        ...addons,
                        { id: Date.now(), name: item.name, price: "" },
                      ])
                    }
                    key={item.id}
                    className="flex items-center space-x-2 cursor-pointer"
                  >
                    <span className="rounded-md border px-3 h-10 flex items-center">
                      {item.name}
                    </span>

                    <Button
                      className="bg-transparent border border-primary"
                      size="icon-lg"
                      type="button"
                    >
                      <Plus className="text-primary" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* Submit */}
            <Button size="lg" className="rounded-md w-full" type="submit">
              Save Changes
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
}
