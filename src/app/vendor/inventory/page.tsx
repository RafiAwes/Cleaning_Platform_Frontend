"use client";
import { useState, useMemo } from "react";
import { Plus, X } from "lucide-react";
import { toast } from "sonner";
import { FieldValues, useForm } from "react-hook-form";

import Avatars from "@/components/reusable/avater";
import { DeleteBtn, PreviewBtn } from "@/components/reusable/btn";
import { FromInput } from "@/components/reusable/form-input";
import Form from "@/components/reusable/from";
import Modal2 from "@/components/reusable/modal2";
import { Pagination } from "@/components/reusable/pagination";
import SelectBox from "@/components/reusable/select-box";
import { TableNoItem } from "@/components/reusable/table-no-item";
import { TableSkeleton } from "@/components/reusable/table-skeleton";
import { VendorTable } from "@/components/reusable/vendor-table";
import { Button, Label, TableCell, TableRow } from "@/components/ui";
import FavIcon from "@/favicon/favicon";
import { useModalState } from "@/hooks";
import { useFileUpload } from "@/hooks/useFileUpload";
import { PlaceholderImg, helpers } from "@/lib";
import useConfirmation from "@/provider/confirmation";
import { ImgBox } from "@/components/reusable/Img-box";
import {
  useGetInventoryQuery,
  useAddInventoryMutation,
  useUpdateInventoryMutation,
  useDeleteInventoryMutation,
} from "@/redux/api/vendorApi";

const intState = {
  isAdd: false,
  isPreview: false,
};

export default function Inventory() {
  const [state, setState] = useModalState(intState);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState("all");
  const { confirm } = useConfirmation();

  const { data, isLoading } = useGetInventoryQuery({ page });
  const [deleteInventory] = useDeleteInventoryMutation();

  const headers = ["Product", "Quantity", "Status", "Last Updated", "Action"];

  const inventory = data?.inventory?.data || [];
  const paginationMeta = data?.inventory?.meta || {};

  const filteredInventory = useMemo(() => {
    let filtered = inventory;

    if (search) {
      filtered = filtered.filter((item: any) =>
        item.product_name?.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (filter !== "all") {
      const statusMap: Record<string, string> = {
        out_of_stock: "Out of stock",
        huge_quantity: "Huge quantity",
        medium_quantity: "Medium",
        very_low_quantity: "Very low",
      };
      filtered = filtered.filter(
        (item: any) => item.stock_status === statusMap[filter]
      );
    }

    return filtered;
  }, [inventory, search, filter]);

  const handleDelete = async (id: any) => {
    const confirmed = await confirm({
      title: "Delete Product?",
      description:
        "You are going to delete this product. After deleting, this product will no longer be available in your inventory",
    });
    if (!confirmed) return;

    try {
      await deleteInventory(id).unwrap();
      toast.success("Product deleted successfully");
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to delete product");
    }
  };

  return (
    <div className="container mt-5">
      <div>
        <ul className="flex items-center flex-wrap gap-5 justify-between">
          <li className="hidden lg:opacity-0">0</li>
          <li className="text-xl font-semibold">Inventory Management</li>
          <li className="flex items-center gap-5">
            <SelectBox
              defaultValue={filter}
              onChange={(value) => setFilter(value)}
              placeholder="Filter"
              icon={true}
              options={[
                { label: "All", value: "all" },
                { label: "Out of stock", value: "out_of_stock" },
                { label: "Huge quantity", value: "huge_quantity" },
                {
                  label: "Medium quantity",
                  value: "medium_quantity",
                },
                {
                  label: "Very low quantity",
                  value: "very_low_quantity",
                },
              ]}
              triggerClassName="bg-secondary border border-none py-5"
            />
            <Button
              onClick={() => setState("isAdd", true)}
              className="rounded-sm"
            >
              <Plus />
              Add New Product
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
                {paginationMeta.total || 0}
              </sup>
              Products
            </li>
            <li>
              {paginationMeta.last_page && (
                <Pagination
                  onPageChange={(v: any) => setPage(v)}
                  currentPage={paginationMeta.current_page || 1}
                  lastPage={paginationMeta.last_page || 1}
                  from={paginationMeta.from || 1}
                  to={paginationMeta.to || 10}
                  total={paginationMeta.total || 0}
                />
              )}
            </li>
          </ul>
        }
      >
        {isLoading ? (
          <TableSkeleton colSpan={headers?.length} tdStyle="!pl-2" />
        ) : filteredInventory?.length > 0 ? (
          filteredInventory?.map((item: any, index: number) => (
            <TableRow key={index} className="border">
              <TableCell className="relative">
                <div className="flex items-center gap-3">
                  <ImgBox
                    src={item.image_path || ""}
                    alt={item.product_name}
                    className="size-10 rounded object-cover"
                  />
                  <div>
                    <h1 className="text-lg">{item.product_name}</h1>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <h1 className="ml-5">{item.quantity}</h1>
              </TableCell>
              <TableCell>
                <h1
                  className={`px-3 py-1 rounded text-sm font-medium w-fit ${
                    item.stock_status === "Out of stock"
                      ? "bg-red-100 text-red-700"
                      : item.stock_status === "Very low"
                      ? "bg-yellow-100 text-yellow-700"
                      : item.stock_status === "Medium"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {item.stock_status}
                </h1>
              </TableCell>
              <TableCell>
                <div className="flex items-center">
                  <FavIcon name="calender_cc" />
                  <span className="text-figma-gray ml-1">
                    {helpers.formatDate(item.updated_at)}
                  </span>
                </div>
              </TableCell>

              <TableCell>
                <div className="flex items-center space-x-3">
                  <PreviewBtn
                    onClick={() => {
                      setSelectedProduct(item);
                      setState("isPreview", true);
                    }}
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
            title="No products available"
            tdStyle="!bg-background"
          />
        )}
      </VendorTable>

      {/*  =========== Add Modal =============== */}
      <Modal2
        open={state.isAdd}
        setIsOpen={(v) => setState("isAdd", v)}
        title="Add New Product"
        titleStyle="text-center"
        className="sm:max-w-lg"
      >
        <div
          onClick={() => setState("isAdd", false)}
          className="absolute cursor-pointer top-3 right-4"
        >
          <X />
        </div>
        <AddNewProduct onSuccess={() => setState("isAdd", false)} />
      </Modal2>

      {/*  =========== Preview Modal =============== */}
      <Modal2
        open={state.isPreview}
        setIsOpen={(v) => setState("isPreview", v)}
        title="Edit Product"
        titleStyle="text-center"
        className="sm:max-w-lg"
      >
        <div
          onClick={() => setState("isPreview", false)}
          className="absolute cursor-pointer top-3 right-4"
        >
          <X />
        </div>
        <ProductDetails
          product={selectedProduct}
          onSuccess={() => setState("isPreview", false)}
        />
      </Modal2>
    </div>
  );
}

//  =====================  AddNewProduct ===============
function AddNewProduct({ onSuccess }: { onSuccess?: () => void }) {
  const [{ files }, { getInputProps, openFileDialog, clearFiles }] =
    useFileUpload({
      accept: "image/*",
      maxSize: 2048 * 1024, // 2MB in bytes
      onError: (errors) => {
        errors.forEach((error) => toast.error(error));
      },
    });

  const form = useForm({
    defaultValues: {
      product_name: "",
      quantity: 0,
    },
  });

  const [addInventory, { isLoading }] = useAddInventoryMutation();

  const handleSubmit = async (values: FieldValues) => {
    const formData = new FormData();
    formData.append("product_name", values.product_name);
    formData.append("quantity", values.quantity);
    if (files[0]?.file instanceof File) {
      formData.append("image", files[0].file);
    }

    try {
      await addInventory(formData).unwrap();
      toast.success("Product added successfully");
      clearFiles();
      form.reset();
      onSuccess?.();
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to add product");
    }
  };

  return (
    <Form from={form} className="space-y-6" onSubmit={handleSubmit}>
      <Label
        htmlFor="image"
        className="relative mx-auto w-full border border-dashed h-[200px] rounded-md border-primary cursor-pointer"
      >
        {files[0]?.preview ? (
          <ImgBox
            src={files[0]?.preview || PlaceholderImg() || "/blur.png"}
            alt="img"
            className="w-full h-full object-cover rounded-md"
          >
            <div className="size-10 grid place-items-center absolute rounded-md bg-white/20 backdrop-blur-[20px] right-4 top-4">
              <FavIcon name="upload_cc" />
            </div>
          </ImgBox>
        ) : (
          <div className="text-center mx-auto">
            <p className="text-blacks mb-2 text-sm">Upload Product Image</p>
            <p className="text-gray-400 font-medium mb-4 text-xs">Or</p>

            <Button onClick={openFileDialog} type="button">
              Browse files
            </Button>
          </div>
        )}

        <input
          {...getInputProps()}
          className="sr-only"
          aria-label="Upload image file"
          id="image"
        />
      </Label>

      <FromInput
        label="Product Name"
        name="product_name"
        placeholder="Product name goes here"
        className="h-11 rounded-xl bg-secondary placeholder:text-muted-foreground"
      />
      <FromInput
        label="Quantity"
        name="quantity"
        placeholder="0"
        className="h-11 rounded-xl bg-secondary placeholder:text-muted-foreground"
        type="number"
      />

      <Button size="lg" className="rounded-md w-full" type="submit" disabled={isLoading}>
        {isLoading ? "Adding..." : "Add Product"}
      </Button>
    </Form>
  );
}

//  =====================  ProductDetails ===============
function ProductDetails({
  product,
  onSuccess,
}: {
  product: any;
  onSuccess?: () => void;
}) {
  const [{ files }, { getInputProps, openFileDialog, clearFiles }] =
    useFileUpload({
      accept: "image/*",
      maxSize: 2048 * 1024, // 2MB in bytes
      onError: (errors) => {
        errors.forEach((error) => toast.error(error));
      },
    });

  const form = useForm({
    defaultValues: {
      product_name: product?.product_name || "",
      quantity: product?.quantity || 0,
    },
  });

  const [updateInventory, { isLoading }] = useUpdateInventoryMutation();

  const handleSubmit = async (values: FieldValues) => {
    if (!product?.id) return;

    const formData = new FormData();
    formData.append("product_name", String(values.product_name || ""));
    formData.append("quantity", String(values.quantity || 0));
    if (files[0]?.file instanceof File) {
      formData.append("image", files[0].file);
    }

    try {
      await updateInventory({ id: product.id, formData }).unwrap();
      toast.success("Product updated successfully");
      clearFiles();
      onSuccess?.();
    } catch (err: any) {
      console.error("Update error:", err);
      toast.error(err?.data?.message || "Failed to update product");
    }
  };

  return (
    <Form from={form} className="space-y-6" onSubmit={handleSubmit}>
      <Label
        htmlFor="image"
        className="relative mx-auto w-full border border-dashed h-[200px] rounded-md border-primary cursor-pointer"
      >
        <ImgBox
          src={
            files[0]?.preview ||
            product?.image_path ||
            PlaceholderImg() ||
            "/blur.png"
          }
          alt={product?.product_name}
          className="w-full h-full object-cover rounded-md"
        >
          <div className="size-10 grid place-items-center absolute rounded-md bg-white/20 backdrop-blur-[20px] right-4 top-4">
            <FavIcon name="upload_cc" />
          </div>
        </ImgBox>

        <input
          {...getInputProps()}
          className="sr-only"
          aria-label="Upload image file"
          id="image"
        />
      </Label>

      <FromInput
        label="Product Name"
        name="product_name"
        placeholder="Product name goes here"
        className="h-11 rounded-xl bg-secondary"
      />
      <FromInput
        label="Quantity"
        name="quantity"
        placeholder="0"
        className="h-11 rounded-xl bg-secondary"
        type="number"
      />

      <div className="flex gap-3">
        <Button
          size="lg"
          className="rounded-md flex-1"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </Form>
  );
}
