"use client";

import { ColumnDef } from "@tanstack/react-table";
import ClientAction from "./client-action";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Size = {
  id: string;
  name: string;
  value: string;
  createdAt: string;
};

export const columns: ColumnDef<Size>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "value",
    header: "Value",
  },
  {
    accessorKey: "createdAt",
    header: "Date created",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const sizes = row.original;

      return <ClientAction data={sizes} />;
    },
  },
];
