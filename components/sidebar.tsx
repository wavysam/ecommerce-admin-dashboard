import { Shrikhand } from "next/font/google";
import Link from "next/link";

import { cn } from "@/lib/utils";
import MainNav from "./main-nav";

const shrikhand = Shrikhand({ weight: "400", subsets: ["latin"] });

export default function Sidebar() {
  return (
    <aside className="fixed top-0 w-64 h-screen border-r">
      <div className="h-full py-8 overflow-y-auto">
        <Link href="/" className="flex sm:border-b pb-8 px-8">
          <span className={cn("text-3xl", shrikhand.className)}>shop.co</span>
        </Link>

        <MainNav />
      </div>
    </aside>
  );
}
