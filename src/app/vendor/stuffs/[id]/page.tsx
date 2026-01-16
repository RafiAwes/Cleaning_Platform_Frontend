"use client";
import { useParams } from "next/navigation";
import { EditStuff } from "@/components/common/edit-stuff";
import Avatars from "@/components/reusable/avater";
import { DeleteBtn, EditBtn } from "@/components/reusable/btn";
import IconBox from "@/components/reusable/Icon-box";
import Modal2 from "@/components/reusable/modal2";
import { TableNoItem } from "@/components/reusable/table-no-item";
import { TableSkeleton } from "@/components/reusable/table-skeleton";
import { VendorTable } from "@/components/reusable/vendor-table";
import { TableCell, TableRow } from "@/components/ui";
import { Badge } from "@/components/ui/badge";
import FavIcon from "@/favicon/favicon";
import useConfirmation from "@/provider/confirmation";
import { X } from "lucide-react";
import { useState } from "react";
import { useGetCleanerQuery, useDeleteCleanerMutation } from "@/redux/api/vendorApi";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { helpers } from "@/lib";

export default function StuffDetails() {
  const { confirm } = useConfirmation();
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const [isEdit, setIsEdit] = useState(false);

  const { data, isLoading, error } = useGetCleanerQuery(id);
  const [deleteCleaner] = useDeleteCleanerMutation();

  const cleaner = data?.cleaner;

  const handleDelete = async () => {
    const confirmed = await confirm({
      title: "Delete Staff?",
      description:
        "You are going to delete this staff member. After deleting, this staff will no longer be available in your platform",
    });
    if (!confirmed) return;

    try {
      await deleteCleaner(id).unwrap();
      toast.success("Staff deleted successfully");
      router.push("/vendor/stuffs");
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to delete staff");
    }
  };

  const ongoingBookings = cleaner?.bookings?.filter((b: any) => 
    ['pending', 'in_progress'].includes(b.status)
  ) || [];
  
  const completedBookings = cleaner?.bookings?.filter((b: any) => 
    b.status === 'completed'
  ) || [];

  if (isLoading) {
    return (
      <div className="container mt-10">
        <h1 className="text-xl lg:text-2xl text-center font-semibold">
          Stuff Details
        </h1>
        <div className="bg-secondary animate-pulse h-24 mt-10 rounded-md" />
        <div className="mt-10">
          <div className="bg-secondary animate-pulse h-8 w-48 rounded mb-4" />
          <div className="bg-secondary animate-pulse h-32 rounded" />
        </div>
      </div>
    );
  }

  if (error || !cleaner) {
    return (
      <div className="container mt-10">
        <div className="text-center">
          <h1 className="text-xl font-semibold text-red-500">Staff not found</h1>
          <p className="text-gray-500 mt-2">This staff member does not exist or you don't have permission to view it.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-10">
      <h1 className="text-xl lg:text-2xl text-center font-semibold">
        Stuff Details
      </h1>
      <div className="bg-secondary flex justify-between items-center flex-wrap p-4 mt-10 rounded-md gap-4">
        <div className="flex items-center gap-3">
          <Avatars
            src={cleaner.image || ""}
            fallback={cleaner.name?.[0] || "S"}
            alt={cleaner.name || "profile"}
            fallbackStyle="aStyle rounded-md"
            className="rounded-md"
          />
          <div>
            <h1 className="text-lg font-semibold">{cleaner.name}</h1>
            <p className="text-sm text-gray-500">
              {cleaner.bookings_count || 0} total bookings
            </p>
          </div>
        </div>
        <div className="flex flex-col">
          <h3 className="font-medium">{cleaner.phone}</h3>
          <p className="text-sm text-gray-500">
            {cleaner.active_bookings || 0} active
          </p>
        </div>
        <div className="flex flex-col">
          <h2>{cleaner.address || "No address provided"}</h2>
          <p className="text-sm text-gray-500">
            {cleaner.completed_bookings || 0} completed
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge 
            variant={
              cleaner.status === 'active' ? 'completed' : 
              cleaner.status === 'assigned' ? 'pending' : 
              'cancelled'
            }
          >
            {cleaner.status}
          </Badge>
          <EditBtn
            onClick={() => setIsEdit(true)}
            color="#000"
            className="bg-white"
          />
          <DeleteBtn
            onClick={handleDelete}
            className="bg-white"
          />
        </div>
      </div>
      {/* Ongoing order */}
      <div>
        <h2 className="text-lg font-semibold mt-10">Ongoing Orders ({ongoingBookings.length})</h2>
        <VendorTable headers={[]}>
          {isLoading ? (
            <TableSkeleton colSpan={4} tdStyle="!pl-2" />
          ) : ongoingBookings?.length > 0 ? (
            ongoingBookings.map((booking: any, index: number) => (
              <TableRow key={index} className="border">
                <TableCell>
                  <div className="flex">
                    <IconBox className="m-0">
                      <FavIcon className="size-5" name="bookings_cc" />
                    </IconBox>
                    <div className="ml-2">
                      <p>{booking.package?.name || booking.service_name || "Custom Service"}</p>
                      <p className="text-xl font-semibold">{helpers.formatCurrency(booking.total_price)}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="relative">
                  <div className="flex items-center gap-3">
                    <Avatars
                      src={booking.customer?.image || ""}
                      fallback={booking.customer?.name?.[0] || "C"}
                      alt="customer"
                      fallbackStyle="aStyle"
                    />
                    <div>
                      <h1 className="text-lg">{booking.customer?.name || "Customer"}</h1>
                      <h1 className="text-figma-gray">{booking.customer?.email}</h1>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <FavIcon name="calender_cc" />
                    <span className="text-figma-gray ml-1">
                      {booking.booking_date_time ? helpers.formatDate(booking.booking_date_time) : "Not scheduled"}
                    </span>
                  </div>
                </TableCell>

                <TableCell>
                  <Badge variant={booking.status === 'pending' ? 'pending' : 'default'}>
                    {booking.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableNoItem
              colSpan={4}
              title="No ongoing orders at the moment"
              tdStyle="!bg-background"
            />
          )}
        </VendorTable>
      </div>
      {/* Completed orders */}
      <div>
        <h2 className="text-lg font-semibold mt-10">Completed Orders ({completedBookings.length})</h2>
        <VendorTable headers={[]}>
          {isLoading ? (
            <TableSkeleton colSpan={5} tdStyle="!pl-2" />
          ) : completedBookings?.length > 0 ? (
            completedBookings.map((booking: any, index: number) => (
              <TableRow key={index} className="border">
                <TableCell>
                  <div className="flex">
                    <IconBox className="m-0">
                      <FavIcon className="size-5" name="bookings_cc" />
                    </IconBox>
                    <div className="ml-2">
                      <p>{booking.package?.name || booking.service_name || "Custom Service"}</p>
                      <p className="text-xl font-semibold">{helpers.formatCurrency(booking.total_price)}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="relative">
                  <div className="flex items-center gap-3">
                    <Avatars
                      src={booking.customer?.image || ""}
                      fallback={booking.customer?.name?.[0] || "C"}
                      alt="customer"
                      fallbackStyle="aStyle"
                    />
                    <div>
                      <h1 className="text-lg">{booking.customer?.name || "Customer"}</h1>
                      <h1 className="text-figma-gray">{booking.customer?.email}</h1>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <FavIcon name="calender_cc" />
                    <span className="text-figma-gray ml-1">
                      {booking.booking_date_time ? helpers.formatDate(booking.booking_date_time) : "Not scheduled"}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="relative">
                  <h1 className="border flex w-fit py-1 space-x-2 px-3 rounded-md">
                    <FavIcon name="rating_value" />
                    <span>{booking.rating || cleaner.ratings || "N/A"}</span>
                  </h1>
                </TableCell>

                <TableCell>
                  <Badge variant="completed">Completed</Badge>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableNoItem
              colSpan={5}
              title="No completed orders yet"
              tdStyle="!bg-background"
            />
          )}
        </VendorTable>
      </div>
      {/*  =========== Edit Modal ========= */}
      <Modal2
        open={isEdit}
        setIsOpen={setIsEdit}
        title="Edit Staff"
        titleStyle="text-center"
        className="sm:max-w-lg"
      >
        <div
          onClick={() => setIsEdit(false)}
          className="absolute cursor-pointer top-3 right-4"
        >
          <X />
        </div>
        <EditStuff 
          cleaner={cleaner} 
          onSuccess={() => setIsEdit(false)} 
        />
      </Modal2>
    </div>
  );
}
