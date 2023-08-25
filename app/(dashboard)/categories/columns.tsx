"use client";

import { ColumnDef } from "@tanstack/react-table";
import ClientAction from "./client-action";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Category = {
  id: string;
  name: string;
  createdAt: string;
};

export const columns: ColumnDef<Category>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "createdAt",
    header: "Date created",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const category = row.original;
      console.log(category);

      return <ClientAction data={category} />;
    },
  },
];
