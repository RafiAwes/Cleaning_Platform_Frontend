import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui";
import { cn } from "@/lib";
import React from "react";

interface TableProps {
  className?: string;
  headers?: string[];
  children: React.ReactNode;
  pagination?: React.ReactNode;
  paginateStyle?: string;
  lastWidth?: string;
}

export const VendorTable = ({
  className,
  headers = [],
  children,
  pagination,
  paginateStyle,
  lastWidth = "[&>tr>td]:last:w-20",
}: TableProps) => {
  return (
    <div className={cn("bg-transparent", className)}>
      <Table className=" border-separate border-spacing-y-5 my-0">
        {headers && headers.length > 0 && (
          <TableHeader className="translate-y-3">
            <TableRow className="text-[17px] hover:bg-transparent font-semibold text-center  text-blacks border-2 border-[#F6F6F6]">
              {headers?.map((header, index) => (
                <TableHead key={index}>
                  <h5 className="w-max capitalize font-semibold">{header}</h5>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
        )}
        <TableBody
          className={cn(
            "[&>tr>td]:bg-secondary [&>tr>td]:first:pl-5  [&>tr>td]:first:rounded-l-xl [&>tr>td]:last:rounded-r-xl",
            lastWidth
          )}
        >
          {children}
        </TableBody>
      </Table>
      {pagination && <div className="mt-5 md:mt-0">{pagination}</div>}
    </div>
  );
};

export const PaymentTable = ({
  className,
  headers = [],
  children,
  lastWidth = "[&>tr>td]:last:w-20",
}: TableProps) => {
  return (
    <div className={cn("bg-transparent w-full", className)}>
      {/* Desktop table - hidden on mobile/tablet */}
      <div className="overflow-x-auto">
        <Table className="border-separate border-spacing-y-2 my-0 min-w-full">
          {headers && headers.length > 0 && (
            <TableHeader className="translate-y-3">
              <TableRow className="text-sm sm:text-base lg:text-[17px] hover:bg-transparent font-semibold text-center text-blacks border-2 border-[#F6F6F6]">
                {headers?.map((header, index) => (
                  <TableHead key={index} className="px-2 sm:px-4">
                    <h5 className="w-max capitalize font-semibold text-xs sm:text-sm lg:text-base">
                      {header}
                    </h5>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
          )}
          <TableBody
            className={cn(
              "[&>tr>td]:bg-secondary [&>tr>td]:first:pl-3 sm:[&>tr>td]:first:pl-5 [&>tr>td]:first:rounded-l-xl [&>tr>td]:last:rounded-r-xl [&>tr>td]:px-2 sm:[&>tr>td]:px-3 [&>tr>td]:py-3 sm:[&>tr>td]:py-4",
              lastWidth
            )}
          >
            {children}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
