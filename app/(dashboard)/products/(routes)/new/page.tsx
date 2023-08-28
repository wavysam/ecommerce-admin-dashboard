import ProductForm from "@/components/forms/product-form";
import Heading from "@/components/heading";
import { prisma } from "@/lib/prisma";

export default async function Page() {
  const categories = await prisma.category.findMany();
  const sizes = await prisma.size.findMany();
  const colors = await prisma.color.findMany();
  return (
    <div>
      <Heading title="Create product" subtitle="Add new product." />
      <div className="py-16">
        <ProductForm categories={categories} sizes={sizes} colors={colors} />
      </div>
    </div>
  );
}
