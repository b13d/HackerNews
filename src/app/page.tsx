import Image from "next/image";
import GetData from "./components/getData";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 w-[1000px] gap-4 m-auto">
      <GetData />
    </main>
  );
}
