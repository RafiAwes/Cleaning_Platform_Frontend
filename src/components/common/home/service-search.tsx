"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui";
import { useGetCategoriesQuery } from "@/redux/api/categoryApi";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ServiceSearch = () => {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const { data: categoriesData, isLoading: isCategoriesLoading } = useGetCategoriesQuery(undefined);

  // Convert categories to options format when data is loaded
  const serviceCategories = categoriesData?.data?.map((category: any) => ({
    value: category.id.toString(),
    label: category.name
  })) || [];

  type CategoryOption = {
    value: string;
    label: string;
  };

  const handleBookNow = () => {
    if (selectedCategory) {
      router.push(`/book-now?category=${selectedCategory}`);
    } else {
      router.push("/book-now");
    }
  };

  const handleBrowseAll = () => {
    router.push("/book-now");
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
  };

  return (
    <section className="bg-gradient-to-r from-blue-50 to-indigo-50 py-16 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          The Easiest Way to Book Premium Cleaning Services
        </h2>
        <p className="text-gray-600 mb-8 text-lg">
          Find the perfect cleaning service tailored to your needs
        </p>
        
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex flex-col md:flex-row gap-4 items-end">
            <div className="flex-1">
              <label className="block text-left text-gray-700 font-medium mb-2">
                Search by Service Name
              </label>
              <Select onValueChange={handleCategoryChange} value={selectedCategory}>
                <SelectTrigger className="w-full h-12 border border-gray-300 rounded-lg px-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <SelectValue placeholder={isCategoriesLoading ? "Loading categories..." : "Select a service category"} />
                </SelectTrigger>
                <SelectContent>
                  {isCategoriesLoading ? (
                    <SelectItem value="loading" disabled>
                      Loading categories...
                    </SelectItem>
                  ) : (
                    serviceCategories.map((category: CategoryOption) => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex gap-3">
              <Button
                onClick={handleBookNow}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200 h-12"
                disabled={isCategoriesLoading}
              >
                Book Now
              </Button>
              
              <Button
                onClick={handleBrowseAll}
                variant="outline"
                className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-3 rounded-lg font-medium transition-colors duration-200 h-12"
              >
                Browse All Services
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceSearch;