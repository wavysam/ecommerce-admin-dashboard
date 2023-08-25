"use client";

import { ColumnDef } from "@tanstack/react-table";
import ClientAction from "./client-action";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Color = {
  id: string;
  name: string;
  value: string;
  createdAt: string;
};

export const columns: ColumnDef<Color>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "value",
    header: "Value",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <div
          className="h-5 w-5 rounded-full border"
          style={{ backgroundColor: `${row.original.value}` }}
        />
        <span>{row.original.value}</span>
      </div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Date created",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const colors = row.original;

      return <ClientAction data={colors} />;
    },
  },
];
