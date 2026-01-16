"use client";
import { FieldValues, useForm } from "react-hook-form";
import { FromInput } from "@/components/reusable/form-input";
import { useFileUpload } from "@/hooks/useFileUpload";
import { Button, Input, Label } from "@/components/ui";
import { FromTextArea } from "@/components/reusable/from-textarea";
import FilePreviewDesign from "@/components/reusable/file-upload-design";
import { DeleteBtn } from "@/components/reusable/btn";
import Form from "@/components/reusable/from";
import { useState, useEffect } from "react";
import { CircleAlert, Plus, Trash2 } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { package_store } from "@/lib";
import { useCreatePackageMutation } from "@/redux/api/packageApi";
import { useGetAddonsQuery } from "@/redux/api/addonApi";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const SERVICES_STORAGE_KEY = "package_services";

export default function PackageStore() {
  const [selectedAddons, setSelectedAddons] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const [serviceInput, setServiceInput] = useState("");
  
  const [createPackage, { isLoading }] = useCreatePackageMutation();
  const { data: addonsData, isLoading: addonsLoading, isError: addonsError } = useGetAddonsQuery(undefined);
  const router = useRouter();

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

  // Initialize with services from localStorage
  useEffect(() => {
    const storedServices = localStorage.getItem(SERVICES_STORAGE_KEY);
    if (storedServices) {
      try {
        setServices(JSON.parse(storedServices));
      } catch (error) {
        console.error("Failed to parse services from localStorage", error);
      }
    }
  }, []);

  // Update localStorage whenever services change
  useEffect(() => {
    localStorage.setItem(SERVICES_STORAGE_KEY, JSON.stringify(services));
  }, [services]);

  const [{ files }, { getInputProps, clearFiles, openFileDialog }] =
    useFileUpload({
      accept: "image/*",
      onFilesChange: (files) => {
        form.setValue("image", files[0]?.file);
      },
    });

  const addService = () => {
    if (!serviceInput.trim()) {
      toast.error("Please enter a service name");
      return;
    }

    const newService = {
      id: Date.now(),
      title: serviceInput,
      description: serviceInput,
      price: 0,
    };

    setServices([...services, newService]);
    setServiceInput("");
    toast.success("Service added successfully!");
  };

  const removeService = (id: number) => {
    setServices(services.filter(s => s.id !== id));
    toast.success("Service removed!");
  };

  const handleSubmit = async (values: FieldValues) => {
    try {
      if (services.length === 0) {
        toast.error("Please add at least one service");
        return;
      }

      // Validate image size (4MB = 4096KB)
      const imageFile = files[0]?.file;
      if (imageFile) {
        const fileSizeInKB = imageFile.size / 1024;
        if (fileSizeInKB > 4096) {
          toast.error(`Image is too large (${(fileSizeInKB / 1024).toFixed(2)}MB). Maximum size is 4MB.`);
          return;
        }
      }

      const packageData = {
        title: values.title,
        description: values.about,
        price: parseFloat(values.price),
        image: imageFile || null,
        services: services.map(s => ({
          title: s.title,
        })),
        addons: selectedAddons.map(a => ({ addon_id: a.id, price: a.price || 0 })),
      };

      console.log("Submitting package data:", packageData);
      
      const result = await createPackage(packageData).unwrap();
      
      toast.success(result.message || "Package created successfully!");
      
      // Clear localStorage after successful submission
      localStorage.removeItem(SERVICES_STORAGE_KEY);
      setServices([]);
      
      // Redirect to packages list or dashboard after successful creation
      router.push('/vendor/packages');
    } catch (error: any) {
      console.error("Error creating package:", error);
      console.error("Error details:", {
        status: error?.status,
        data: error?.data,
        message: error?.message,
        originalStatus: error?.originalStatus
      });
      
      // Show validation errors if present
      if (error?.data?.errors) {
        console.error("Validation errors:", error.data.errors);
        const validationMessages = Object.values(error.data.errors).flat().join(', ');
        toast.error(validationMessages);
      } else {
        toast.error(error?.data?.message || error?.message || "Failed to create package");
      }
    }
  };

  // Update selected addon price
  const updateAddonPrice = (id: number, price: number) => {
    setSelectedAddons(prev => 
      prev.map(addon => 
        addon.id === id ? { ...addon, price } : addon
      )
    );
  };

  // Remove addon from package
  const removeSelectedAddon = (id: number) => {
    setSelectedAddons(prev => prev.filter(addon => addon.id !== id));
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

            {/* Services Section */}
            <div>
              <Label className="text-black text-base font-medium mb-2">
                Services Included
              </Label>
              <div className="space-y-3">
                {/* Service Input */}
                <div className="space-y-2">
                  <Input
                    placeholder="Service name (e.g., Deep Cleaning)"
                    value={serviceInput}
                    onChange={(e) => setServiceInput(e.target.value)}
                    className="h-11 rounded-xl bg-secondary"
                    onKeyPress={(e) => e.key === "Enter" && addService()}
                  />
                  <Button
                    type="button"
                    onClick={addService}
                    className="w-full rounded-xl h-11 flex items-center justify-center gap-2"
                  >
                    <Plus size={18} />
                    Add Service
                  </Button>
                </div>

                {/* Services List */}
                {services.length > 0 && (
                  <div className="space-y-2 p-3 border rounded-lg bg-gray-50">
                    {services.map((service) => (
                      <div
                        key={service.id}
                        className="flex items-center justify-between p-2 border rounded-lg bg-white hover:bg-gray-100 transition"
                      >
                        <div className="flex-1">
                          <p className="font-medium text-sm">{service.title}</p>
                        </div>
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          onClick={() => removeService(service.id)}
                          className="ml-2"
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
                {services.length === 0 && (
                  <p className="text-sm text-gray-500 italic">No services added yet</p>
                )}
              </div>
            </div>

            {/* Available Add-ons Section */}
            {!addonsLoading && addonsData && (
              <div>
                <Label className="text-black text-base font-medium mb-2">
                  Available Add-ons
                </Label>
                <div className="flex items-center flex-wrap gap-4">
                  {(addonsData || []).map((addon: any) => {
                    const isSelected = selectedAddons.some(sa => sa.id === addon.id);
                    return (
                      <div
                        key={addon.id}
                        className="flex items-center space-x-2 cursor-pointer"
                      >
                        <span className="rounded-md border px-3 h-10 flex items-center">
                          {addon.name}
                        </span>

                        <Button
                          className={`${
                            isSelected
                              ? "bg-red-500 border-red-500"
                              : "bg-transparent border border-primary"
                          }`}
                          size="icon-lg"
                          type="button"
                          onClick={() => {
                            if (isSelected) {
                              removeSelectedAddon(addon.id);
                            } else {
                              setSelectedAddons(prev => [
                                ...prev,
                                { ...addon, price: addon.price || 0 },
                              ]);
                            }
                          }}
                        >
                          <Plus className={isSelected ? "text-white" : "text-primary"} />
                        </Button>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
            {addonsError && (
              <div className="text-red-500">Failed to load add-ons</div>
            )}
            {addonsLoading && (
              <div>Loading add-ons...</div>
            )}

            {/* Selected Add-ons Display */}
            {selectedAddons.length > 0 && (
              <div>
                <Label className="text-black text-base font-medium mb-2">
                  Selected Add-ons
                </Label>
                <div className="space-y-2 p-3 border rounded-lg bg-gray-50">
                  {selectedAddons.map((addon: any) => (
                    <div
                      key={addon.id}
                      className="flex items-center justify-between gap-2 p-2 border rounded-lg bg-white"
                    >
                      <div className="flex-1">
                        <p className="font-medium text-sm">{addon.name}</p>
                      </div>
                      <Input
                        type="number"
                        placeholder="Price"
                        value={addon.price}
                        onChange={(e) => updateAddonPrice(addon.id, parseFloat(e.target.value) || 0)}
                        className="h-9 w-24 rounded-lg bg-white"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        onClick={() => removeSelectedAddon(addon.id)}
                        className="ml-2"
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Submit */}
            <Button size="lg" className="rounded-md w-full" type="submit" disabled={isLoading}>
              {isLoading ? "Publishing..." : "Publish"}
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
}
