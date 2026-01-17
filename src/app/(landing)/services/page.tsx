"use client";

import assets from "@/assets";
import { Button, Input } from "@/components/ui";
import { ArrowBlackRightIcon, FilterIcon } from "@/icon";
import { Star, Search } from "lucide-react";
import Image from "next/image";
import { useState, useMemo } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { useGetAllServicesQuery } from "@/redux/api/servicesApi";
import { Skeleton } from "@/components/ui/skeleton";

interface Service {
  id: number;
  title: string;
  description: string;
  price: number;
  rating: number;
  image: string;
  vendor: {
    id: number;
    name: string;
  };
  services: Array<{ id: number; title: string }>;
}

export default function ServicePage() {
  const [searchText, setSearchText] = useState("");
  const [draftSearch, setDraftSearch] = useState("");
  const [sortBy, setSortBy] = useState("latest");

  // Build query parameters
  const queryParams = useMemo(() => {
    const params: Record<string, any> = { per_page: 12 };
    
    if (searchText.trim()) {
      params.search = searchText.trim();
    }

    if (sortBy !== "latest") {
      params.sort_by = sortBy;
    }

    return params;
  }, [searchText, sortBy]);

  const { data, isLoading } = useGetAllServicesQuery(queryParams);

  const services = data?.data || [];
  const paginationMeta = {
    total: data?.total || 0,
    current_page: data?.current_page || 1,
    last_page: data?.last_page || 1,
  };

  return (
    <div className="container px-4 py-12">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div className="flex items-center gap-3 bg-secondary md:w-[40%] rounded-2xl px-3 py-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by package name, service title or vendor name"
            value={draftSearch}
            onChange={(e) => setDraftSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setSearchText(draftSearch.trim());
              }
            }}
            className="flex-1 border-none focus:border-none focus:outline-none focus:ring-0 focus:ring-offset-0"
          />
          <Button
            className="bg-primary text-white px-4"
            onClick={() => setSearchText(draftSearch.trim())}
            size="sm"
          >
            Search
          </Button>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger className=" flex items-center gap-1 bg-secondary p-2 rounded-2xl w-[40%] md:w-auto">
            <FilterIcon /> Sort by
          </DropdownMenuTrigger>
          <DropdownMenuContent className="md:mr-4">
            <DropdownMenuLabel>Sort Options</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setSortBy("latest")}>
              Latest
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSortBy("highest_price")}>
              Highest price
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSortBy("lowest_price")}>
              Lowest price
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSortBy("highest_rating")}>
              Highest rating
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSortBy("lowest_rating")}>
              Lowest rating
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Main Content */}
      <main className="">
        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {isLoading ? (
            <>
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-secondary rounded-2xl overflow-hidden">
                  <Skeleton className="w-full h-64 rounded-2xl" />
                  <div className="p-4 space-y-3">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Skeleton className="w-10 h-10 rounded-full" />
                        <div className="space-y-2">
                          <Skeleton className="h-4 w-24" />
                          <Skeleton className="h-3 w-16" />
                        </div>
                      </div>
                      <Skeleton className="h-10 w-16" />
                    </div>
                  </div>
                </div>
              ))}
            </>
          ) : services?.length > 0 ? (
            services?.map((service: Service) => (
              <div
                key={service.id}
                className="bg-secondary rounded-2xl overflow-hidden  "
              >
                {/* Service Image */}
                <div className="relative w-full h-64 bg-muted overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover rounded-2xl transition duration-300"
                  />
                </div>

                {/* Service Info */}
                <div className="p-4">
                  {/* Title and Price */}
                  <div className="flex justify-between">
                    <p className="max-w-[80%] text-sm line-clamp-2">{service.title}</p>
                    <span className="text-[#000000] font-bold text-[16px] xl:text-[20px]">
                      ${service.price}
                    </span>
                  </div>

                  {/* Vendor Info and Rating */}
                  <div className="flex items-center justify-between mt-4 pt-4 ">
                    <div className="flex items-center gap-2">
                      <div>
                        <Image
                          src={assets.userPhoto1}
                          alt={service.vendor?.name || "vendor"}
                          width={40}
                          height={40}
                          className="rounded-full w-10 h-10"
                        />
                      </div>
                      <div>
                        <h1 className="text-[#000000]  text-[14px] font-medium">
                          {service.vendor?.name}
                        </h1>

                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3 h-3 ${
                                i < Math.floor(service.rating || 0)
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-muted-foreground"
                              }`}
                            />
                          ))}
                          <span className="text-xs">
                            {service.rating?.toFixed(1) || 0}
                          </span>
                        </div>
                      </div>
                    </div>

                    <Link href={`/services/${service.id}`}>
                      <Button
                        className=" bg-white text-black font-bold"
                        size={"lg"}
                        icon={false}
                      >
                        Order
                        <ArrowBlackRightIcon className="text-black" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500 text-lg">No services found matching your search.</p>
            </div>
          )}
        </div>

        {/* Pagination Info */}
        {!isLoading && services?.length > 0 && (
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              Showing {services.length} of {paginationMeta.total} services
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
