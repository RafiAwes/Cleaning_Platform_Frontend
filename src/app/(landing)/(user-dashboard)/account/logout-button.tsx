"use client";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/redux/hooks";
import { clearAuth } from "@/redux/features/authSlice";
import { helpers } from "@/lib/helpers";
import { authKey } from "@/lib/constants";
import { DblogoutIcon } from "@/icon";

export default function LogoutButton() {
    const router = useRouter();
    const dispatch = useAppDispatch();

    const handleLogout = () => {
        // Clear Redux state
        dispatch(clearAuth());

        // Clear cookies
        helpers.removeAuthCookie(authKey);

        // Clear localStorage
        helpers.removeStorageItem("auth_user");

        // Redirect to login
        router.push("/auth");
    };

    return (
        <button
            onClick={handleLogout}
            className="cursor-pointer flex justify-center items-center gap-2 rounded-[10px] text-red-500 text-[18px] border border-red-500 p-2 mt-4 w-full"
        >
            <DblogoutIcon />
            Logout
        </button>
    );
}
