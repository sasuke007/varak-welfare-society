import { prisma } from "@/lib/prisma";

export async function getMenuItems() {
  return prisma.menuItem.findMany({
    where: { isActive: true, parentId: null },
    include: {
      children: {
        where: { isActive: true },
        orderBy: { order: "asc" },
      },
    },
    orderBy: { order: "asc" },
  });
}
