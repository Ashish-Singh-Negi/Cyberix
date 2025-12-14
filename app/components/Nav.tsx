"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { FaMobileAlt } from "react-icons/fa";
import { AiFillContainer } from "react-icons/ai";
import { FaMicrophoneAlt } from "react-icons/fa";
import { BsCpu } from "react-icons/bs";
import { BsGpuCard } from "react-icons/bs";
import { MdOutlineMonitor } from "react-icons/md";
import { FaKeyboard } from "react-icons/fa";
import { FaMouse } from "react-icons/fa";
import { FaHeadphones } from "react-icons/fa";
import { MdLaptopChromebook } from "react-icons/md";
import { FaMemory } from "react-icons/fa";
import { FaHardDrive } from "react-icons/fa6";
import { useMenuContext } from "@/contexts/menuContext";

const links = [
  { name: "Mobile", href: "/mobile", icon: <FaMobileAlt /> },
  { name: "Cabinate", href: "/cabinate", icon: <AiFillContainer /> },
  { name: "Microphone", href: "/microphone", icon: <FaMicrophoneAlt /> },
  { name: "Processor", href: "/processor", icon: <BsCpu /> },
  { name: "Monitor", href: "/monitor", icon: <MdOutlineMonitor /> },
  { name: "Graphics card", href: "/grapics-card", icon: <BsGpuCard /> },
  { name: "keyboard", href: "/keyboard", icon: <FaKeyboard /> },
  { name: "Mouse", href: "/mouse", icon: <FaMouse /> },
  { name: "Headphone", href: "/headphone", icon: <FaHeadphones /> },
  { name: "laptop", href: "/laptop", icon: <MdLaptopChromebook /> },
  { name: "RAM", href: "/ram", icon: <FaMemory /> },
  { name: "Storage", href: "/storage", icon: <FaHardDrive /> },
];

const Nav = () => {
  const pathname = usePathname();

  const { menuOpen } = useMenuContext();
  return (
    <nav
      className={`${
        pathname === "/buy" && "hidden"
      } h-screen w-[216px] bg-white dark:bg-gray-900 border-r-2 dark:border-gray-500 ${
        menuOpen ? "block absolute z-[9]" : "hidden"
      } lg:block lg:static`}
    >
      <div className="min-h-fit mt-2 border-b-2 dark:border-gray-500">
        {/* <p className="font-semibold text-xl px-2 mb-2">Category</p> */}
        <div className="h-fit w-full mt-2 text-gray-800 flex flex-col gap-1 pb-2">
          {links.map((link) => (
            <div
              className="h-full w-full flex mt-1 transition-all"
              key={link.name}
            >
              <span
                className={`h-10 w-1 absolute z-10 rounded-r-xl  transition-all ${
                  pathname.includes(link.href) && "bg-blue-400 dark:bg-blue-500"
                }`}
              ></span>
              <Link
                href={link.href}
                className={`h-10 w-full text-lg flex items-center gap-1 pl-6 rounded-lg cursor-pointer hover:font-semibold transition-all dark:text-gray-400 font-normal active:scale-95 ${
                  pathname.includes(link.href) &&
                  "font-semibold bg-blue-100 dark:bg-blue-950 dark:text-gray-50 dark:font-semibold"
                }`}
              >
                <span className="h-6 w-6 flex justify-center items-center">
                  {link.icon}
                </span>
                {link.name}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
