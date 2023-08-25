import dayjs from "dayjs";

import { prisma } from "@/lib/prisma";
import { DataTable } from "@/components/data-table";
import { columns } from "./columns";
import Heading from "@/components/heading";

export default async function Page() {
  const category = await prisma.category.findMany();
  const formattedCategory = category.map((item) => ({
    id: item.id,
    name: item.name,
    createdAt: dayjs(item.createdAt).format("MMM DD, YYYY - ddd"),
  }));

  return (
    <div>
      <Heading
        title="Categories"
        subtitle="Manage categories."
        href="/categories/new"
      />
      <div className="pt-6">
        <DataTable
          columns={columns}
          data={formattedCategory}
          searchKey="name"
        />
      </div>
    </div>
  );
}
