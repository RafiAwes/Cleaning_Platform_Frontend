"use client";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/redux/hooks";
import { clearAuth } from "@/redux/features/authSlice";
import { helpers } from "@/lib/helpers";
import { authKey } from "@/lib/constants";
import { useLogoutMutation } from "@/redux/api/authApi";
import { toast } from "sonner";

export default function VendorLogoutButton() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [logout, { isLoading }] = useLogoutMutation();

    const handleLogout = async () => {
        try {
            // Call the logout API to invalidate the session on the server
            await logout({}).unwrap();
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
            disabled={isLoading}
            className="cursor-pointer flex justify-center items-center gap-2 rounded-[10px] text-red-500 text-[18px] border border-red-500 p-2 mt-4 w-full"
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" x2="9" y1="12" y2="12" />
            </svg>
            {isLoading ? 'Logging out...' : 'Logout'}
        </button>
    );
}