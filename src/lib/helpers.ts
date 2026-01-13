import relativeTime from "dayjs/plugin/relativeTime";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import dayjs from "dayjs";
import { authKey } from "./constants";
dayjs.extend(relativeTime);

export class helpers {
  // ===== Cookies =====
  static setAuthCookie(key: string, value: string): void {
    Cookies.set(key, value);
  }

  static getAuthCookie(key: string): string | undefined {
    return Cookies.get(key);
  }

  static removeAuthCookie(key: string): void {
    Cookies.remove(key);
  }

  static hasAuthToken(): string | undefined {
    return Cookies.get(authKey);
  }

  static decodeToken(token: string): any {
    return jwtDecode(token);
  }

  // ===== Dates =====
  static formatDate(date: string | Date, type = "DD MMM YYYY"): string {
    return dayjs(date).format(type);
  }

  static formatTime(date: string | Date): string {
    return dayjs(date).format("h:s A");
  }

  static formatDateTime(date: string | Date): string {
    return dayjs(date).format("h:s A - DD MMM YYYY");
  }
  static timeAgoDiff(date: string | Date): string {
    return dayjs(date).fromNow();
  }
  //  ===== localStorage  =====
  static getStorageItem = (key: string) => {
    return localStorage.getItem(key);
  };
  static setStorageItem = (key: string, value: string | any) => {
    return localStorage.setItem(key, value);
  };
  static removeStorageItem = (key: string) => {
    return localStorage.removeItem(key);
  };

  // ===== Strings =====
  static capitalize(text: string): string {
    if (!text) return "";
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  static lowerCase(text: string): string {
    return text ? text.toLowerCase() : "";
  }

  static upperCase(text: string): string {
    return text ? text.toUpperCase() : "";
  }
  static randomString(): string {
    return crypto.randomUUID();
  }
  static randomNumber(): any {
    return Math.floor(Math.random() * 666666);
  }
  static slugify(value: string): string {
    const str = value?.toString()?.trim()?.toLowerCase();
    return str?.includes(" ") ? str?.replace(/\s+/g, "-") : str;
  }
  // ========= from data =============
  static fromData(values: Record<string, any>): FormData {
    const formData = new FormData();
    Object.keys(values).forEach((key) => {
      const value = values[key];
      if (Array.isArray(value)) {
        if (value.every((v) => v instanceof File)) {
          value.forEach((file: File) => formData.append(key, file));
        } else {
          formData.append(key, JSON.stringify(value));
        }
      } else if (value instanceof File) {
        formData.append(key, value);
      } else if (typeof value === "object" && value !== null) {
        formData.append(key, JSON.stringify(value));
      } else if (value === "array") {
        formData.append(key, JSON.stringify(value));
      } else {
        formData.append(key, value);
      }
    });
    return formData;
  }

  static imgSource(href: string): string {
    if (href?.startsWith("https://") || href?.startsWith("http://"))
      return href;
    return href ? `${process.env.NEXT_PUBLIC_IMG_URL}/${href}` : "";
  }

  static isAuthenticated(): boolean {
    const token = helpers.getAuthCookie(authKey);
    const storedUserStr = helpers.getStorageItem("auth_user");

    if (!token) {
      return false;
    }

    try {
      const storedUser = storedUserStr ? JSON.parse(storedUserStr) : null;
      if (storedUser && storedUser.role) {
        return true;
      }

      // Try to decode token to see if it has role info
      try {
        const decodedToken = helpers.decodeToken(token);
        return !!(decodedToken && (decodedToken.role || decodedToken.user_role));
      } catch (decodeError) {
        return false;
      }
    } catch (parseError) {
      return false;
    }
  }

  static getUserRole(): string | null {
    const token = helpers.getAuthCookie(authKey);
    const storedUserStr = helpers.getStorageItem("auth_user");

    // First try to get role from localStorage
    if (storedUserStr) {
      try {
        const storedUser = JSON.parse(storedUserStr);
        if (storedUser && storedUser.role) {
          return storedUser.role;
        }
      } catch (parseError) {
        console.error('Error parsing stored user:', parseError);
      }
    }

    // Fallback to token decoding
    if (token) {
      try {
        const decodedToken = helpers.decodeToken(token);
        return decodedToken?.role || decodedToken?.user_role || null;
      } catch (decodeError) {
        console.error('Error decoding token:', decodeError);
      }
    }

    return null;
  }

  static hasRole(role: string): boolean {
    const userRole = helpers.getUserRole();
    return userRole ? userRole.toLowerCase() === role.toLowerCase() : false;
  }
}
