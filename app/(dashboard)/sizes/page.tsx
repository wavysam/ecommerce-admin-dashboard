import dayjs from "dayjs";

import { prisma } from "@/lib/prisma";
import { DataTable } from "@/components/data-table";
import { columns } from "./columns";
import Heading from "@/components/heading";

export default async function Page() {
  const sizes = await prisma.size.findMany();
  const formattedSizes = sizes.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    createdAt: dayjs(item.createdAt).format("MMM DD, YYYY - ddd"),
  }));

  return (
    <div>
      <Heading title="Sizes" subtitle="Manage sizes." href="/sizes/new" />
      <div className="pt-6">
        <DataTable columns={columns} data={formattedSizes} searchKey="name" />
      </div>
    </div>
  );
}
