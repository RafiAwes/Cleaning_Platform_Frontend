"use client";
import { useEffect } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { setUser } from "@/redux/features/authSlice";
import { helpers } from "@/lib/helpers";
import { authKey } from "@/lib/constants";

// Helper function to validate JWT format
function isValidJWT(token: string): boolean {
    if (!token || typeof token !== "string") return false;
    const parts = token.split(".");
    return parts.length === 3;
}

export function AuthInitializer() {
    const dispatch = useAppDispatch();

    useEffect(() => {
        // Check if there's a persisted token
        const token = helpers.getAuthCookie(authKey);

        if (token && isValidJWT(token)) {
            // Get user data from localStorage as backup
            const storedUserStr = helpers.getStorageItem("auth_user");
            let storedUser = null;
            if (storedUserStr) {
                try {
                    storedUser = JSON.parse(storedUserStr);
                } catch (parseError) {
                    console.error("Failed to parse stored user:", parseError);
                    helpers.removeStorageItem("auth_user");
                }
            }

            try {
                // Try to decode the token to get user info
                const decodedToken = helpers.decodeToken(token);

                // Combine token data with stored user data if available
                const userData = {
                    name: decodedToken.name || decodedToken.user_name || storedUser?.name || "",
                    email: decodedToken.email || storedUser?.email || "",
                    role: decodedToken.role || decodedToken.user_role || storedUser?.role || "",
                    token,
                };

                console.log('Restoring auth state from token and localStorage:', userData);

                // Only dispatch if we have at least a role
                if (userData.role && userData.role.trim() !== "") {
                    // Dispatch user data (from token or localStorage)
                    dispatch(setUser(userData));
                }
            } catch (error) {
                console.error("Failed to decode token:", error);

                // If token decoding fails, try to get user info from localStorage
                if (storedUser) {
                    const userDataFromStorage = {
                        name: storedUser.name || "",
                        email: storedUser.email || "",
                        role: storedUser.role || "",
                        token,
                    };
                    console.log('Restoring auth state from localStorage only:', userDataFromStorage);

                    // Only dispatch if we have at least a role
                    if (userDataFromStorage.role && userDataFromStorage.role.trim() !== "") {
                        dispatch(setUser(userDataFromStorage));
                    }
                } else {
                    console.log('Token invalid and no stored user data, removing auth cookie');
                    // If token is invalid and no stored user, remove it
                    helpers.removeAuthCookie(authKey);
                }
            }
        } else if (helpers.getStorageItem("auth_user")) {
            // No token in cookies but user data is in localStorage, try to get token from cookies again
            // and if no token, at least set user info without token so UI can update appropriately
            const storedUserStr = helpers.getStorageItem("auth_user");
            if (storedUserStr) {
                try {
                    const storedUser = JSON.parse(storedUserStr);
                    if (token && isValidJWT(token)) {
                        // We have both token and stored user, restore both
                        const userDataWithToken = {
                            name: storedUser.name || "",
                            email: storedUser.email || "",
                            role: storedUser.role || "",
                            token,
                        };
                        console.log('Restoring auth state with token and stored user:', userDataWithToken);

                        // Only dispatch if we have at least a role
                        if (userDataWithToken.role && userDataWithToken.role.trim() !== "") {
                            dispatch(setUser(userDataWithToken));
                        }
                    } else {
                        // We only have stored user data, set user info but keep isAuthenticated false
                        const userDataWithoutToken = {
                            name: storedUser.name || "",
                            email: storedUser.email || "",
                            role: storedUser.role || "",
                            token: "",
                        };
                        console.log('Restoring auth state from localStorage only (no token):', userDataWithoutToken);

                        // Only dispatch if we have at least a role
                        if (userDataWithoutToken.role && userDataWithoutToken.role.trim() !== "") {
                            dispatch(setUser(userDataWithoutToken));
                        }
                    }
                } catch (error) {
                    console.error("Failed to restore user from storage:", error);
                    helpers.removeStorageItem("auth_user");
                }
            }
        }
    }, [dispatch]);

    return null;
}
