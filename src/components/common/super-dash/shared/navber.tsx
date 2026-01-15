import { ImgBox } from "@/components/reusable/Img-box";
import FavIcon from "@/favicon/favicon";
import { RandomImg } from "@/lib";
import { useTitle } from "@/provider/title";
import { Menu } from "lucide-react";
import Link from "next/link";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { useLogoutMutation } from "@/redux/api/authApi";
import { useRouter } from "next/navigation";
import { helpers } from "@/lib/helpers";
import { authKey } from "@/lib/constants";
import { clearAuth } from "@/redux/features/authSlice";
import { toast } from "sonner";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export default function Navber({ sidebarOpen, setSidebarOpen }: SidebarProps) {
  const { title, subtitle } = useTitle();
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [logoutUser] = useLogoutMutation();
  const router = useRouter();
  
  const handleLogout = async () => {
    try {
      await logoutUser({}).unwrap();
      // Clear auth cookie and Redux state
      helpers.removeAuthCookie(authKey);
      dispatch(clearAuth());
      router.push('/auth');
      toast.success("Logged out successfully!");
    } catch (err) {
      console.error("Logout error:", err);
      // Even if backend logout fails, clear local state
      helpers.removeAuthCookie(authKey);
      dispatch(clearAuth());
      router.push('/auth');
      toast.success("Logged out successfully!");
    }
  };

  return (
    <div className="sticky top-0  flex w-full bg-[white] py-3 z-10 shadow-xs">
      <header className="w-full px-3">
        <div className="flex justify-between items-center">
          {/* left side*/}
          <div className="flex gap-4 items-center">
            <button
              aria-controls="sidebar"
              onClick={(e) => {
                e.stopPropagation();
                setSidebarOpen(!sidebarOpen);
              }}
              className="z-99999 block  border rounded-md border-stroke cursor-pointer  p-1.5 lg:hidden"
            >
              <Menu className="cursor-pointer" size={20} />
            </button>
            <ul className="hidden lg:block">
              <li className="text-2xl font-bold">{title}</li>
              {subtitle && (
                <li className="font-normal text-figma-gray">{subtitle}</li>
              )}
            </ul>
          </div>
          {/* right side */}
          <div>
            <div className="flex mr-6 items-center gap-2">
              <Link href={"/admin/notification"}>
                <div className="relative cursor-pointer bg-secondary size-11 2xl:size-12  grid place-items-center rounded-full">
                  <FavIcon name="noti" />
                </div>
              </Link>

              <Link href="/admin/settings">
                <div className="relative">
                  <div className="flex items-center gap-2 rounded-full cursor-pointer group">
                    <ImgBox
                      src={RandomImg()}
                      className="rounded-full size-11"
                      alt="User Icon"
                    />
                    <ul className="leading-5 mb-1">
                      <li className="font-semibold">{user.name || "Admin"}</li>
                      <li className="text-figma-a_gray">{user.email || "admin@example.com"}</li>
                    </ul>
                  </div>
                  
                  {/* Dropdown menu */}
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                    <div className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer" onClick={() => router.push('/admin/settings')}>
                      My Account
                    </div>
                    <button 
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
