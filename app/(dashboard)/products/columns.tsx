"use client";

import { ColumnDef } from "@tanstack/react-table";
import ClientAction from "./client-action";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Product = {
  id: string;
  name: string;
  price: number;
  category: string;
  size: string;
  color: string;
  isFeatured: boolean;
  isPaid: boolean;
  createdAt: string;
};

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "size",
    header: "Size",
  },
  {
    accessorKey: "color",
    header: "Color",
  },
  {
    accessorKey: "isFeatured",
    header: "isFeatured",
  },
  {
    accessorKey: "isPaid",
    header: "isPaid",
  },
  {
    accessorKey: "createdAt",
    header: "Date created",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const products = row.original;

      return <ClientAction data={products} />;
    },
  },
];
