import { prisma } from "@/lib/prisma";

export type MenuItem = {
  id: string;
  name: string;
  url: string;
  order: number;
  isActive: boolean;
  parentId: string | null;
  children?: MenuItem[];
};

export async function getMenuItems(): Promise<MenuItem[]> {
  return prisma.menuItem.findMany({
    where: { isActive: true, parentId: null },
    include: {
      children: {
        where: { isActive: true },
        orderBy: { order: "asc" },
      },
    },
    orderBy: { order: "asc" },
  }) as Promise<MenuItem[]>;
}
