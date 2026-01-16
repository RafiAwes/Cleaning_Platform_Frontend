"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { Plus, X } from "lucide-react";
import { toast } from "sonner";
import { FieldValues, useForm } from "react-hook-form";

import Avatars from "@/components/reusable/avater";
import { DeleteBtn, EditBtn, PreviewBtn } from "@/components/reusable/btn";
import { FromInput } from "@/components/reusable/form-input";
import Form from "@/components/reusable/from";
import Modal2 from "@/components/reusable/modal2";
import { Pagination } from "@/components/reusable/pagination";
import { TableNoItem } from "@/components/reusable/table-no-item";
import { TableSkeleton } from "@/components/reusable/table-skeleton";
import { VendorTable } from "@/components/reusable/vendor-table";
import { Button, Label, TableCell, TableRow } from "@/components/ui";
import { Badge } from "@/components/ui/badge";
import SearchBox from "@/components/common/super-dash/reuse/search-box";
import { useModalState } from "@/hooks";
import { useFileUpload } from "@/hooks/useFileUpload";
import { helpers, PlaceholderImg } from "@/lib";
import useConfirmation from "@/provider/confirmation";
import profile from "@/assets/profile.png";
import {
  useAddCleanerMutation,
  useDeleteCleanerMutation,
  useGetCleanersQuery,
  useUpdateCleanerMutation,
} from "@/redux/api/vendorApi";

const intState = {
  isAdd: false,
  isEdit: false,
  isPreview: false,
};

export default function Stuffs() {
  const [state, setState] = useModalState(intState);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [selectedCleaner, setSelectedCleaner] = useState<any>(null);
  const { confirm } = useConfirmation();
  const headers = ["Stuff Name", "Phone Number", "Address", "Status", "Action"];

  const { data, isLoading, isFetching, error } = useGetCleanersQuery({ page });
  const [addCleaner, { isLoading: isAdding }] = useAddCleanerMutation();
  const [updateCleaner, { isLoading: isUpdating }] = useUpdateCleanerMutation();
  const [deleteCleaner] = useDeleteCleanerMutation();

  const cleanersResponse = data?.cleaners;
  const cleaners = cleanersResponse?.data || cleanersResponse || [];
  const paginationMeta = cleanersResponse?.meta || cleanersResponse || {};

  const filteredCleaners = useMemo(() => {
    if (!search) return cleaners;
    return cleaners.filter((c: any) =>
      c?.name?.toLowerCase().includes(search.toLowerCase()) ||
      c?.phone?.toLowerCase?.().includes(search.toLowerCase())
    );
  }, [cleaners, search]);

  const handleDelete = async (id: any) => {
    const confirmed = await confirm({
      title: "Delete Stuffs ?",
      description:
        "You are going to delete this Stuffs. After deleting, this Stuffs will no longer available in your platform",
    });
    if (!confirmed) return;

    try {
      await deleteCleaner(id).unwrap();
      toast.success("Cleaner deleted successfully");
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to delete cleaner");
    }
  };

  const handleAdd = async (values: FieldValues, file?: File) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("phone", values.phone);
    if (values.address) {
      formData.append("address", values.address);
    }
    formData.append("status", "active");
    if (file) {
      formData.append("image", file);
    }

    try {
      await addCleaner(formData).unwrap();
      toast.success("Cleaner added successfully");
      setState("isAdd", false);
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to add cleaner");
    }
  };

  const handleUpdate = async (values: FieldValues, file?: File) => {
    if (!selectedCleaner) return;
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("phone", values.phone);
    if (values.address) {
      formData.append("address", values.address);
    }
    formData.append("status", values.status || selectedCleaner.status || "active");
    if (file) {
      formData.append("image", file);
    }

    try {
      await updateCleaner({ id: selectedCleaner.id, formData }).unwrap();
      toast.success("Cleaner updated successfully");
      setState("isEdit", false);
      setSelectedCleaner(null);
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to update cleaner");
    }
  };

  return (
    <div className="container mt-5">
      <div>
        <ul className="flex items-center flex-wrap gap-5 justify-between">
          <li>
            <SearchBox
              className="rounded-md lg:min-w-xl!"
              onChange={(v: any) =>
                setSearch(
                  typeof v === "string"
                    ? v
                    : (v?.target as HTMLInputElement | undefined)?.value || ""
                )
              }
              placeholder="Search by stuff name"
              leftBtn={true}
              rightBtn={false}
            />
          </li>
          <li>
            <Button
              onClick={() => setState("isAdd", true)}
              className="rounded-sm"
            >
              <Plus />
              Add New Stuff
            </Button>
          </li>
        </ul>
      </div>
      <VendorTable
        headers={headers}
        pagination={
          <ul className="flex items-center flex-wrap justify-between py-3">
            <li className="flex">
              Total:
              <sup className="font-medium text-2xl relative -top-3 px-2 ">
                {paginationMeta?.total ?? filteredCleaners?.length ?? 0}
              </sup>
              Shifts
            </li>
            <li>
              <Pagination
                onPageChange={(v: any) => setPage(v)}
                {...paginationMeta}
              />
            </li>
          </ul>
        }
      >
        {isLoading || isFetching ? (
          <TableSkeleton colSpan={headers?.length} tdStyle="!pl-2" />
        ) : error ? (
          <TableNoItem
            colSpan={headers?.length}
            title="Failed to load staffs"
            tdStyle="!bg-background"
          />
        ) : filteredCleaners?.length > 0 ? (
          filteredCleaners?.map((item: any, index: number) => (
            <TableRow key={index} className="border">
              <TableCell className="relative">
                <div className="flex items-center gap-3">
                  <Avatars
                    src={item.image ? `${process.env.NEXT_PUBLIC_API_URL}/storage/${item.image}` : ""}
                    fallback={item.name}
                    alt="profile"
                    fallbackStyle="aStyle"
                  />
                  <div>
                    <h1 className="text-lg">{item.name}</h1>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <h1 className="ml-5">{item.phone || "N/A"}</h1>
              </TableCell>
              <TableCell>{item.address || "N/A"}</TableCell>
              <TableCell>
                <Badge variant={helpers.lowerCase(item.status || "active") as any}>
                  {helpers.capitalize(item.status || "active")}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center space-x-3">
                  <Link href={`/vendor/stuffs/${item.id}`}>
                    <PreviewBtn className="bg-white" />
                  </Link>
                  <EditBtn
                    onClick={() => {
                      setSelectedCleaner(item);
                      setState("isEdit", true);
                    }}
                    color="#000"
                    className="bg-white"
                  />
                  <DeleteBtn
                    onClick={() => handleDelete(item.id)}
                    className="bg-white"
                  />
                </div>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableNoItem
            colSpan={headers?.length}
            title="No Stuffs are available at the moment"
            tdStyle="!bg-background"
          />
        )}
      </VendorTable>
      {/*  =========== add =============== */}
      <Modal2
        open={state.isAdd}
        setIsOpen={(v) => setState("isAdd", v)}
        title="Add Stuff"
        titleStyle="text-center"
        className="sm:max-w-lg"
      >
        <div
          onClick={() => setState("isAdd", false)}
          className="absolute cursor-pointer top-3 right-4"
        >
          <X />
        </div>
        <StaffForm onSubmit={handleAdd} isSubmitting={isAdding} />
      </Modal2>
      {/*  =========== ProductDetails =============== */}
      <Modal2
        open={state.isEdit}
        setIsOpen={(v) => setState("isEdit", v)}
        title="Edit Stuff"
        titleStyle="text-center"
        className="sm:max-w-lg"
      >
        <div
          onClick={() => setState("isEdit", false)}
          className="absolute cursor-pointer top-3 right-4"
        >
          <X />
        </div>
        <StaffForm
          onSubmit={handleUpdate}
          isSubmitting={isUpdating}
          defaultValues={selectedCleaner}
        />
      </Modal2>
    </div>
  );
}

//  =====================  Shared Staff Form ===============
function StaffForm({
  onSubmit,
  isSubmitting,
  defaultValues,
}: {
  onSubmit: (values: FieldValues, file?: File) => Promise<void> | void;
  isSubmitting?: boolean;
  defaultValues?: any;
}) {
  const [{ files }, { getInputProps, clearFiles }] = useFileUpload({
    accept: "image/*",
  });

  const form = useForm({
    defaultValues: {
      name: defaultValues?.name || "",
      phone: defaultValues?.phone || "",
      address: defaultValues?.address || "",
      status: defaultValues?.status || "active",
    },
  });

  useEffect(() => {
    form.reset({
      name: defaultValues?.name || "",
      phone: defaultValues?.phone || "",
      address: defaultValues?.address || "",
      status: defaultValues?.status || "active",
    });
    clearFiles();
  }, [defaultValues, form, clearFiles]);

  const handleProfileSubmit = async (values: FieldValues) => {
    const file = files[0]?.file as File | undefined;
    await onSubmit(values, file);
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
      <FromInput
        label="Status"
        name="status"
        placeholder="Status"
        className="h-11 rounded-xl bg-secondary placeholder:text-muted-foreground"
      />

      <Button size="lg" className="rounded-md w-full" type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Saving..." : "Save"}
      </Button>
    </Form>
  );
}
