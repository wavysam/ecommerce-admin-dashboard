import dayjs from "dayjs";

import { prisma } from "@/lib/prisma";
import { DataTable } from "@/components/data-table";
import { columns } from "./columns";
import Heading from "@/components/heading";

export default async function Page() {
  const colors = await prisma.color.findMany();
  const formattedColors = colors.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    createdAt: dayjs(item.createdAt).format("MMM DD, YYYY - ddd"),
  }));

  return (
    <div>
      <Heading title="Colors" subtitle="Manage colors." href="/colors/new" />
      <div className="pt-6">
        <DataTable columns={columns} data={formattedColors} searchKey="name" />
      </div>
    </div>
  );
}
