"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { UserButton } from "@clerk/nextjs";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

function Header() {
  const path = usePathname();
  const router = useRouter();

  useEffect(() => {
    console.log(path);
  }, []);

  return (
    <div className="flex items-center py-4 px-2 justify-between  mx-8 bg-secondary shadow-lg">
      <div className="flex gap-3 items-center">
        <Link href={"/dashboard"}>
          <Image
            src={"/logo.svg"}
            width={40}
            height={60}
            alt="logo"
            className="cursor-pointer"
          />
        </Link>
        <span className="text-lg font-semibold">NextGenInterview</span>
      </div>
      <ul className="hidden md:flex gap-6">
        <li
          onClick={() => router.push(`/dashboard`)}
          className={`hover:text-slate-800 cursor-pointer hover:font-bold transition-all
            ${path == "/dashboard" && "text-slate-800 font-bold"}`}
        >
          DashBoard
        </li>
        <li
          onClick={() => router.push(`/questions`)}
          className={`hover:text-slate-800 cursor-pointer hover:font-bold transition-all
            ${path == "/dashboard/questions" && "text-slate-800 font-bold"}`}
        >
          FAQs
        </li>
        <li
          onClick={() => router.push(`/upgrade`)}
          className={`hover:text-slate-800 cursor-pointer hover:font-bold transition-all
            ${path == "/dashboard/upgrade" && "text-slate-800 font-bold"}`}
        >
          Upgrade
        </li>
        <li
          onClick={() => router.push(`/how`)}
          className={`hover:text-slate-800 cursor-pointer hover:font-bold transition-all
            ${path == "/dashboard/how" && "text-slate-800 font-bold"}`}
        >
          How It works?
        </li>
      </ul>
      <UserButton />
    </div>
  );
}

export default Header;
