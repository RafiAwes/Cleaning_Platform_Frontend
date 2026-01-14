"use client";

import { useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import { useEffect, ReactNode, useState } from "react";
import { helpers } from "@/lib/helpers";

interface ProtectedRouteProps {
    children: ReactNode;
    allowedRoles?: string[]; // If not provided, any authenticated user can access
    redirectTo?: string; // Where to redirect if not authenticated (default: '/auth')
}

export default function ProtectedRoute({
    children,
    allowedRoles,
    redirectTo = '/auth'
}: ProtectedRouteProps) {
    const { user, isAuthenticated } = useAppSelector((state) => state.auth);
    const router = useRouter();
    const [checkedAuth, setCheckedAuth] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            // Wait a bit for AuthInitializer to potentially update the state
            await new Promise(resolve => setTimeout(resolve, 100));

            // Check if user is authenticated
            if (!isAuthenticated) {
                // Check if we have stored credentials that might restore the auth state
                const token = helpers.getAuthCookie("auth_token");
                const storedUserStr = helpers.getStorageItem("auth_user");

                if (token && storedUserStr) {
                    // We have credentials stored, but auth state isn't initialized yet
                    // Wait a bit more for the AuthInitializer to run
                    await new Promise(resolve => setTimeout(resolve, 300));
                } else {
                    // No stored credentials, definitely not authenticated
                    router.push(redirectTo);
                    setCheckedAuth(true);
                    return;
                }
            }

            // If allowed roles are specified, check if user's role is allowed
            if (allowedRoles && allowedRoles.length > 0) {
                const userRole = user.role?.toLowerCase();
                const hasAccess = allowedRoles.some(role => role.toLowerCase() === userRole);

                if (!hasAccess) {
                    // Redirect to home or unauthorized page if user doesn't have required role
                    router.push('/');
                }
            }

            setCheckedAuth(true);
        };

        checkAuth();
    }, [isAuthenticated, user.role, router, redirectTo, allowedRoles]);

    // Only render children if auth has been checked and user is authenticated and has required role
    if (!checkedAuth) {
        return <div className="flex items-center justify-center min-h-screen">Loading...</div>; // Show loading while checking auth status
    }

    if (!isAuthenticated) {
        return null;
    }

    if (allowedRoles && allowedRoles.length > 0) {
        const userRole = user.role?.toLowerCase();
        const hasAccess = allowedRoles.some(role => role.toLowerCase() === userRole);

        if (!hasAccess) {
            return null;
        }
    }

    return <>{children}</>;
}