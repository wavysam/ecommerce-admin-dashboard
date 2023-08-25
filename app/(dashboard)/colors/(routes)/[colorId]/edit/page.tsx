import ColorForm from "@/components/forms/color-form";
import Heading from "@/components/heading";
import { prisma } from "@/lib/prisma";

export default async function Page({
  params,
}: {
  params: { colorId: string };
}) {
  const color = await prisma.color.findUnique({
    where: {
      id: params.colorId,
    },
  });
  return (
    <div>
      <Heading title="Update Size" subtitle="Edit size." />
      <div className="py-16 max-w-lg">
        <ColorForm initialData={color} />
      </div>
    </div>
  );
}
