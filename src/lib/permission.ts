// lib/permission.ts

import { prisma } from "@/lib/prisma";

export async function getAccessibleModules(roleId: string) {
  return prisma.tblModule.findMany({
    orderBy: {
      position: "asc",
    },

    where: {
      permissions: {
        some: {
          name: "VIEW",

          rolePermissions: {
            some: {
              roleId,
            },
          },
        },
      },
    },

    select: {
      href: true,

      position: true,
    },
  });
}
