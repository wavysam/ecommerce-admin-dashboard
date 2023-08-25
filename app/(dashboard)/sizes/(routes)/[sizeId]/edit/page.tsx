import SizeForm from "@/components/forms/size-form";
import Heading from "@/components/heading";
import { prisma } from "@/lib/prisma";

export default async function Page({ params }: { params: { sizeId: string } }) {
  const category = await prisma.size.findUnique({
    where: {
      id: params.sizeId,
    },
  });
  return (
    <div>
      <Heading title="Update Size" subtitle="Edit size." />
      <div className="py-16 max-w-lg">
        <SizeForm initialData={category} />
      </div>
    </div>
  );
}
