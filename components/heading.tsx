"use client";

import { useRouter } from "next/navigation";

import { Separator } from "@/components/ui/separator";
import { Button } from "./ui/button";
import { BiPlus } from "react-icons/bi";

interface Props {
  title: string;
  subtitle: string;
  href?: string;
}

export default function Heading({ title, subtitle, href }: Props) {
  const router = useRouter();
  return (
    <>
      <div className="flex justify-between items-center pb-6">
        <div>
          <h1 className="text-3xl font-bold">{title}</h1>
          <p className="text-sm mt-1">{subtitle}</p>
        </div>
        {href && (
          <Button
            onClick={() => router.push(href!)}
            className="flex items-center gap-1"
          >
            <BiPlus size={18} />
            Add New
          </Button>
        )}
      </div>
      <Separator />
    </>
  );
}
