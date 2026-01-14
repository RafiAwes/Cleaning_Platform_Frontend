"use client";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/redux/hooks";
import { clearAuth } from "@/redux/features/authSlice";
import { helpers } from "@/lib/helpers";
import { authKey } from "@/lib/constants";
import { DblogoutIcon } from "@/icon";
import { useLogoutMutation } from "@/redux/api/authApi";

export default function LogoutButton() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [logout, { isLoading }] = useLogoutMutation();

    const handleLogout = async () => {
        try {
            // Call the logout API to invalidate the session on the server
            await logout().unwrap();
        } catch (error) {
            console.error('Logout API error:', error);
            // Even if the API fails, we should still clear local state
        } finally {
            // Clear Redux state
            dispatch(clearAuth());

            // Clear cookies
            helpers.removeAuthCookie(authKey);

            // Clear localStorage
            helpers.removeStorageItem("auth_user");

            // Redirect to login
            router.push("/auth");
        }
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
