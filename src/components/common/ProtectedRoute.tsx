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
    const [initialAuthCheck, setInitialAuthCheck] = useState(false);

    useEffect(() => {
        // Do initial synchronous check for token
        const token = helpers.getAuthCookie("auth_token");
        if (token) {
            setInitialAuthCheck(true);
        }
    }, []);

    useEffect(() => {
        const checkAuth = async () => {
            // If we have a token but not authenticated yet, wait for AuthInitializer
            if (initialAuthCheck && !isAuthenticated) {
                await new Promise(resolve => setTimeout(resolve, 500));
            }

            // Re-check authentication after waiting
            const currentlyAuthenticated = isAuthenticated;
            const token = helpers.getAuthCookie("auth_token");

            // If still not authenticated after waiting, redirect
            if (!currentlyAuthenticated && !token) {
                router.push(redirectTo);
                setCheckedAuth(true);
                return;
            }

            // If we have a token but still not authenticated, wait a bit more
            if (token && !currentlyAuthenticated) {
                await new Promise(resolve => setTimeout(resolve, 300));
            }

            // Final check - if no token or not authenticated, redirect to login
            const finalToken = helpers.getAuthCookie("auth_token");
            const finalAuthState = isAuthenticated;
            
            if (!finalToken || !finalAuthState) {
                router.push(redirectTo);
                setCheckedAuth(true);
                return;
            }

            // User is authenticated - now check if they have the required role
            if (allowedRoles && allowedRoles.length > 0) {
                const userRole = user.role?.toLowerCase();
                const hasAccess = allowedRoles.some(role => role.toLowerCase() === userRole);

                if (!hasAccess) {
                    // Authenticated but wrong role - redirect to home
                    router.push('/');
                    setCheckedAuth(true);
                    return;
                }
            }

            setCheckedAuth(true);
        };

        checkAuth();
    }, [isAuthenticated, user.role, router, redirectTo, allowedRoles, initialAuthCheck]);

    // Only render children if auth has been checked
    if (!checkedAuth) {
        return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
    }

    // Already handled redirects in the effect, so just render children if we got here
    return <>{children}</>;
}