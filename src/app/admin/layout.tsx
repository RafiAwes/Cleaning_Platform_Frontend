"use client";
import Navber from "@/components/common/super-dash/shared/navber";
import Sidebar from "@/components/common/super-dash/shared/sideber";
import { TitleProvider } from "@/provider/title";
import { childrenProps } from "@/types";
import { useState } from "react";
import ProtectedRoute from "@/components/common/ProtectedRoute";

export default function AdminLayout({ children }: childrenProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <ProtectedRoute allowedRoles={["admin"]} redirectTo="/auth">
      <TitleProvider>
        <div className="flex h-screen overflow-hidden">
          {/* <!-- ===== Sidebar Start ===== --> */}
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          {/* <!-- ===== Content Area Start ===== --> */}
          <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
            <Navber sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            <div className="p-4">{children}</div>
          </div>
        </div>
      </TitleProvider>
    </ProtectedRoute>
  );
}
