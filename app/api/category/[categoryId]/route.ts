import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(
  request: Request,
  { params }: { params: { categoryId: string } }
) {
  const body = await request.json();
  const { name } = body;
  const { categoryId } = params;
  try {
    const category = await prisma.category.update({
      where: {
        id: categoryId,
      },
      data: {
        name,
      },
    });

    return NextResponse.json(category, { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { categoryId: string } }
) {
  const { categoryId } = params;
  try {
    const category = await prisma.category.delete({
      where: {
        id: categoryId,
      },
    });

    return NextResponse.json(category, { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
