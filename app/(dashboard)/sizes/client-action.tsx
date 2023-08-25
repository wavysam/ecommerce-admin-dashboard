"use client";

import { useRouter } from "next/navigation";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Size } from "./columns";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Copy, Edit, Trash } from "lucide-react";
import AlertModal from "@/components/alert-modal";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

interface Props {
  data: Size;
}

export default function ClientAction({ data }: Props) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const onDelete = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/size/${data.id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        router.refresh();
        toast({
          title: "Success!",
          description: "Size removed.",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong!",
          description: "Removed first the product using this size.",
        });
      }
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        disabled={loading}
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => navigator.clipboard.writeText(data.id)}
          >
            <Copy className="h4 w-4 mr-2" />
            Copy ID
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => router.push(`/sizes/${data.id}/edit`)}
          >
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4 mr-2" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
