"use client";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Button } from "../ui";
import Link from "next/link";
import IconBox from "../reusable/Icon-box";
import FavIcon from "@/favicon/favicon";
import Avatars from "../reusable/avater";
import assets, { loginUser } from "@/assets";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { useLogoutMutation } from "@/redux/api/authApi";
import { useRouter } from "next/navigation";
import { helpers } from "@/lib/helpers";
import { authKey } from "@/lib/constants";
import { clearAuth } from "@/redux/features/authSlice";
import { toast } from "sonner";

const Navbar = () => {
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const ShowNavBc = ["/"];
  const isShowNavBc = ShowNavBc.includes(pathname);

  const navLinks = [
    { href: "/", text: "Home" },
    { href: "/book-now", text: "Book now" },
    ...(user?.role === "customer" ? [{ href: "/blogs", text: "Blogs" }] : []),
    { href: "/works", text: "How it works" },
    { href: "/about-us", text: "About us" },
    { href: "/faq", text: "FAQ" },
  ];

  const activeLink = navLinks.find((link) => link.href === pathname)?.text;

  // Disable scroll on mobile menu open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full  ${isShowNavBc ? "bg-linear-to-r from-[#a19991] to-[#c6c4c2]/30" : "bg-secondary backdrop-blur-md border-gray-200"}`}
      >
        <div className="container px-4">
          <div className="flex h-16 items-center justify-between">
            <Link href="/">
              <Image
                src="/images/logo.png"
                alt="Nexus Logo"
                width={50}
                height={50}
                className="rounded-md"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.text}
                  href={link.href}
                  className={`font-medium transition-colors duration-300 ${
                    activeLink === link.text
                      ? "text-[#000000] font-semibold"
                      : "text-gray-600 hover:text-[#000000]"
                  }`}
                >
                  {link.text}
                </Link>
              ))}
            </nav>

            {/* Desktop Button */}
            {user.role === "customer" ? (
              <div className="hidden lg:flex items-center gap-4">
                <Link href={"/chart"}>
                  <IconBox className="rounded-md">
                    <FavIcon name="chat_cc" />
                  </IconBox>
                </Link>

                <Link href={"/notification"}>
                  <IconBox className="rounded-md">
                    <FavIcon name="noti" />
                  </IconBox>
                </Link>

                <div className="relative">
                  <div className="flex items-center gap-3 cursor-pointer group">
                    <Image
                      src={assets.LoginUserPhoto}
                      alt="user photo"
                      width={40}
                      height={40}
                      className="w-[40px] h-[40px] rounded-[6px]"
                    />
                    <div className=" text-black leading-5 mb-1">
                      <p className="font-semibold">{user.name || "User"}</p>
                      <p>{user.email}</p>
                    </div>
                  </div>
                                  
                  {/* Dropdown menu */}
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                    <Link href="/account" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      My Account
                    </Link>
                    <button 
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="hidden lg:flex items-center space-x-3">
                <Link href="/auth">
                  <Button className="h-11">Create an account</Button>
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-md relative"
              aria-label="Toggle menu"
            >
              <Menu
                className={`h-6 w-6 transition-transform duration-300 ${
                  isMenuOpen ? "rotate-90 scale-0" : "rotate-0 scale-100"
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black bg-opacity-50 transition-opacity lg:hidden ${
          isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={toggleMenu}
      ></div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-4/5 max-w-sm z-50 bg-secondary transform transition-transform duration-300 ease-in-out lg:hidden ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Mobile Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <Image
              src="/images/logo.png"
              alt="Nexus Logo"
              width={40}
              height={40}
              className="rounded-full"
            />
            <button
              onClick={toggleMenu}
              className="p-2 text-gray-500 rounded-md hover:bg-gray-100"
              aria-label="Close menu"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Mobile Links */}
          <nav className="p-4">
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.text}
                  href={link.href}
                  onClick={toggleMenu}
                  className={`px-3 py-2 text-base font-medium rounded-md transition-colors duration-300 ${
                    activeLink === link.text
                      ? "text-[#000000] bg-secondary font-semibold"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {link.text}
                </Link>
              ))}
            </div>
          </nav>

          {/* Mobile Button */}
          <div className="p-4   border-t border-gray-200 mt-auto ">
            {user.role === "customer" ? (
              <div>
                <div className=" flex flex-col justify-center items-center text-black leading-5 mb-4">
                  <p className="font-semibold">{user.name || "User"}</p>
                  <p>{user.email}</p>
                </div>

                <div className="flex justify-center items-center gap-4">
                  <Link href={"/chart"} onClick={toggleMenu}>
                    <div>
                      <IconBox className="rounded-md">
                        <FavIcon name="chat_cc" />
                      </IconBox>
                    </div>
                  </Link>

                  <Link href={"/notification"} onClick={toggleMenu}>
                    <div>
                      <IconBox className="rounded-md">
                        <FavIcon name="noti" />
                      </IconBox>
                    </div>
                  </Link>

                  <div className="relative">
                    <div className="flex items-center gap-3 rounded-md p-1 cursor-pointer">
                      <Image
                        src={assets.LoginUserPhoto}
                        alt="user photo"
                        width={40}
                        height={40}
                        className="w-[40px] h-[40px] rounded-[6px]"
                      />
                    </div>
                                    
                    {/* Mobile dropdown menu */}
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                      <Link href="/account" onClick={toggleMenu} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        My Account
                      </Link>
                      <button 
                        onClick={() => {
                          handleLogout();
                          toggleMenu();
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Sign out
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <Link href="/auth" onClick={toggleMenu}>
                  <Button className="w-full">Create an account</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
