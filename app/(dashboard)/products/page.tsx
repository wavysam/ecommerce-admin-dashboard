import dayjs from "dayjs";

import { prisma } from "@/lib/prisma";
import { DataTable } from "@/components/data-table";
import { columns } from "./columns";
import Heading from "@/components/heading";

export default async function Page() {
  const products = await prisma.product.findMany({
    include: {
      category: true,
      size: true,
      color: true,
      images: true,
    },
  });
  const formattedProducts = products.map((item) => ({
    id: item.id,
    name: item.name,
    price: item.price,
    category: item.category.name,
    size: item.size.name,
    color: item.color.value,
    isFeatured: item.isFeatured,
    isPaid: item.isPaid,
    createdAt: dayjs(item.createdAt).format("MMM DD, YYYY - ddd"),
  }));

  return (
    <div>
      <Heading
        title="Products"
        subtitle="Manage products."
        href="/products/new"
      />
      <div className="pt-6">
        <DataTable
          columns={columns}
          data={formattedProducts}
          searchKey="name"
        />
      </div>
    </div>
  );
}
