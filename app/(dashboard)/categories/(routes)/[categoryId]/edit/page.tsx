import CategoryForm from "@/components/forms/category-form";
import Heading from "@/components/heading";
import { prisma } from "@/lib/prisma";

export default async function Page({
  params,
}: {
  params: { categoryId: string };
}) {
  const category = await prisma.category.findUnique({
    where: {
      id: params.categoryId,
    },
  });
  return (
    <div>
      <Heading title="Update Category" subtitle="Edit category." />
      <div className="py-16 max-w-lg">
        <CategoryForm initialData={category} />
      </div>
    </div>
  );
}
