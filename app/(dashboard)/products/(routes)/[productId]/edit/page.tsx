import ProductForm from "@/components/forms/product-form";
import Heading from "@/components/heading";
import { prisma } from "@/lib/prisma";

export default async function Page({
  params,
}: {
  params: { productId: string };
}) {
  const products = await prisma.product.findUnique({
    where: {
      id: params.productId,
    },
    include: {
      category: true,
      size: true,
      color: true,
      images: true,
    },
  });

  const categories = await prisma.category.findMany();
  const sizes = await prisma.size.findMany();
  const colors = await prisma.color.findMany();

  return (
    <div>
      <Heading title="Update Size" subtitle="Edit size." />
      <div className="py-16">
        <ProductForm
          initialData={products}
          categories={categories}
          sizes={sizes}
          colors={colors}
        />
      </div>
    </div>
  );
}
