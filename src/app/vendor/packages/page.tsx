"use client";
import { ImgBox } from "@/components/reusable/Img-box";
import { Button } from "@/components/ui";
import FavIcon from "@/favicon/favicon";
import { useModalState } from "@/hooks";
import { RandomImg } from "@/lib";
import { Plus, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useGetVendorPackagesQuery, useDeletePackageMutation } from "@/redux/api/packageApi";
import { toast } from "sonner";
import { TableSkeleton } from "@/components/reusable/table-skeleton";

const intState = {
  isAdd: false,
  isEdit: false,
  isPreview: false,
};

const services = [
  {
    id: 1,
    image: "/woman-cleaning-window-with-yellow-gloves-in-reside.jpg",
    title: "House cleaning service for residential areas in New York",
    price: "$250",
  },
  {
    id: 2,
    image: "/woman-cleaning-window-with-yellow-gloves-in-reside.jpg",
    title: "House cleaning service for residential areas in New York",
    price: "$250",
  },
  {
    id: 3,
    image: "/woman-cleaning-window-with-yellow-gloves-in-reside.jpg",
    title: "House cleaning service for residential areas in New York",
    price: "$250",
  },
  {
    id: 4,
    image: "/woman-cleaning-window-with-yellow-gloves-in-reside.jpg",
    title: "House cleaning service for residential areas in New York",
    price: "$250",
  },
];

export default function Packages() {
  const [state, setState] = useModalState(intState);
  const router = useRouter();
  
  // Fetch packages from API
  const { data: packagesData, isLoading, error } = useGetVendorPackagesQuery(undefined);
  const [deletePackage] = useDeletePackageMutation();
  
  const packages = packagesData?.packages || [];

  const handleDelete = async (packageId: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!confirm("Are you sure you want to delete this package?")) return;
    
    try {
      await deletePackage(packageId).unwrap();
      toast.success("Package deleted successfully");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to delete package");
    }
  };
  
  return (
    <div className="container">
      <ul className="flex items-center flex-wrap mt-10 space-y-2 lg:space-y-0 justify-between">
        <li className="text-xl font-bold">{packages.length} Packages</li>
        <li className="space-x-3">
          <Link href="/vendor/packages/custom-pricing">
            <Button className="rounded-sm bg-white border">
              <FavIcon name="custom_pri" />
              <span className="text-black"> Custom pricing management</span>
            </Button>
          </Link>
          <Link href="/vendor/packages/store">
            <Button
              onClick={() => setState("isAdd", true)}
              className="rounded-sm"
            >
              <Plus />
              Add New Package
            </Button>
          </Link>
        </li>
      </ul>
      <div className="mt-10">
        {isLoading ? (
          <div className="text-center py-10">Loading packages...</div>
        ) : error ? (
          <div className="text-center py-10 text-red-500">Failed to load packages</div>
        ) : packages.length === 0 ? (
          <div className="text-center py-10">No packages found. Create your first package!</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-3">
            {packages.map((item: any, idx: number) => (
              <div 
                key={item.id || idx}
                onClick={() => router.push(`/vendor/packages/${item.id}`)}
                className="bg-secondary p-3 rounded-xl relative group cursor-pointer hover:shadow-lg transition-shadow"
              >
                <ImgBox
                  src={item.image || RandomImg()}
                  className="w-full h-[200px]"
                  alt="Package Image"
                ></ImgBox>
                <div className="mt-3">
                  <h2>{item.title}</h2>
                  <p className="font-semibold text-xl">${item.price}</p>
                </div>
                <div className="absolute top-5 right-5 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                  <Link 
                    href={`/vendor/packages/edit/${item.id}`}
                    onClick={(e) => e.stopPropagation()}
                    className="bg-white p-2 rounded-full shadow-lg hover:bg-gray-100"
                  >
                    <Pencil className="w-4 h-4" />
                  </Link>
                  <button
                    onClick={(e) => handleDelete(item.id, e)}
                    className="bg-red-500 text-white p-2 rounded-full shadow-lg hover:bg-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
