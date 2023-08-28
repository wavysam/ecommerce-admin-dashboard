"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BiBarChart,
  BiCategoryAlt,
  BiCollection,
  BiPalette,
  BiShoppingBag,
} from "react-icons/bi";

export default function MainNav() {
  const pathname = usePathname();
  return (
    <div className="pt-8 px-8">
      <div className="space-y-6">
        <Link href="/overview" className="flex items-center gap-2">
          <BiBarChart
            className={`${
              pathname === "/overview"
                ? "dark:text-lime-500 opacity-100"
                : "opacity-75"
            } h-5 w-5`}
          />
          <span
            className={`${
              pathname === "/overview" ? "opacity-100" : "opacity-75"
            }`}
          >
            Overview
          </span>
        </Link>
        <Link href="/categories" className="flex items-center gap-2">
          <BiCategoryAlt
            className={`${
              pathname === "/categories"
                ? "dark:text-lime-500 opacity-100"
                : "opacity-75"
            } h-5 w-5`}
          />
          <span
            className={`${
              pathname === "/categories" ? "opacity-100" : "opacity-75"
            }`}
          >
            Categories
          </span>
        </Link>
        <Link href="/sizes" className="flex items-center gap-2">
          <BiCollection
            className={`${
              pathname === "/sizes"
                ? "dark:text-lime-500 opacity-100"
                : "opacity-75"
            } h-5 w-5`}
          />
          <span
            className={`${
              pathname === "/sizes" ? "opacity-100" : "opacity-75"
            }`}
          >
            Sizes
          </span>
        </Link>
        <Link href="/colors" className="flex items-center gap-2">
          <BiPalette
            className={`${
              pathname === "/colors"
                ? "dark:text-lime-500 opacity-100"
                : "opacity-75"
            } h-5 w-5`}
          />
          <span
            className={`${
              pathname === "/colors" ? "opacity-100" : "opacity-75"
            }`}
          >
            Colors
          </span>
        </Link>
        <Link href="/products" className="flex items-center gap-2">
          <BiShoppingBag
            className={`${
              pathname === "/products"
                ? "dark:text-lime-500 opacity-100"
                : "opacity-75"
            } h-5 w-5`}
          />
          <span
            className={`${
              pathname === "/products" ? "opacity-100" : "opacity-75"
            }`}
          >
            Products
          </span>
        </Link>
      </div>
    </div>
  );
}
