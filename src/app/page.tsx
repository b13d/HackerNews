import Image from "next/image";
import GetData from "./components/getData";
import Header from "./components/Header";
import { motion, useScroll, useMotionValue } from "framer-motion";

export default function Home() {


  return (
    <main className="flex min-h-screen flex-col items-center justify-between w-max-[1000px]  max-[500px]:px-2 py-4 gap-4 m-auto">
      <Header />

      <GetData />
    </main>
  );
}
