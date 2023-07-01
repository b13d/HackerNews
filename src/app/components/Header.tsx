"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  motion,
  useScroll,
  useMotionValue,
  useMotionValueEvent,
} from "framer-motion";

export default function Header() {
  const [styleOpacity, setStyleOpacity] = useState<string>("opacity-0");
  const { scrollY } = useScroll();
  const y = useMotionValue(0);
  const handleClick = () => {
    window.scrollTo(0, 0);
  };

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 0) setStyleOpacity("opacity-100");
    else setStyleOpacity("opacity-0");
    console.log("scrollY change to", latest);
    console.log();
  });

  return (
    <div className="flex justify-center items-center">
      <motion.div
        onClick={() => handleClick()}
        className={`max-sm:hidden ${styleOpacity} hover:bg-white hover:border-[black] hover:text-[black] border-2 duration-300 ease-in-out cursor-pointer w-[50px] h-[50px] flex items-center justify-center fixed top-[50%] left-4 bg-black text-white`}
      >
        ↑
      </motion.div>

      <Link href="/">
        <img src="/images/logo-hacker-news-no-bg.png" alt="logo" />
      </Link>
    </div>
  );
}
