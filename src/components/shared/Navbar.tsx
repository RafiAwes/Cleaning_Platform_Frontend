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
import { useAppSelector } from "@/redux/hooks";

const Navbar = () => {
  const { user } = useAppSelector((state) => state.auth);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: "/", text: "Home" },
    { href: "/book-now", text: "Book now" },
    ...(user?.role === "user" ? [{ href: "/blogs", text: "Blogs" }] : []),
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
  console.log(user);

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-secondary backdrop-blur-md border-gray-200">
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
                      ? "text-primary font-semibold"
                      : "text-gray-600 hover:text-primary"
                  }`}
                >
                  {link.text}
                </Link>
              ))}
            </nav>

            {/* Desktop Button */}
            {user.role == "user" ? (
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

                <Link href={"/account"}>
                  <div className="flex items-center gap-3">
                    <Image
                      src={assets.LoginUserPhoto}
                      alt="user photo"
                      width={40}
                      height={40}
                      className="w-[40px] h-[40px] rounded-[6px]"
                    />
                    <div className=" text-black leading-5 mb-1">
                      <p className="font-semibold">Elizabeth Olson</p>
                      <p>example@gmail.com</p>
                    </div>
                  </div>
                </Link>
              </div>
            ) : (
              <div className="hidden lg:flex items-center space-x-3">
                <Link href="/auth">
                  <Button>Create an account</Button>
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
                      ? "text-primary bg-secondary font-semibold"
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
            {user.role == "user" ? (
              <div>
                <div className=" flex flex-col justify-center items-center text-black leading-5 mb-4">
                  <p className="font-semibold">Elizabeth Olson</p>
                  <p>example@gmail.com</p>
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

                  <Link href={"/account"} onClick={toggleMenu}>
                    <div className="flex items-center gap-3  rounded-md p-1">
                      <Image
                        src={assets.LoginUserPhoto}
                        alt="user photo"
                        width={40}
                        height={40}
                        className="w-[40px] h-[40px] rounded-[6px]"
                      />
                    </div>
                  </Link>
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
