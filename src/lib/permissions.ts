import { prisma } from "@/lib/prisma";

export async function getUserPermissions(employeeId: string) {
  const employee = await prisma.tblEmployee.findUnique({
    where: {
      id: employeeId,
    },

    select: {
      role: {
        select: {
          rolePermissions: {
            select: {
              permission: {
                select: {
                  name: true,

                  module: {
                    select: {
                      name: true,

                      href: true,

                      position: true,
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  });

  const permissions =
    employee?.role?.rolePermissions.map((rp) => ({
      module: rp.permission.module.name,

      href: rp.permission.module.href,

      position: rp.permission.module.position,

      permission: rp.permission.name,
    })) ?? [];

  return permissions;
}

export function hasPermission(
  permissions: {
    module: string;

    permission: string;
  }[],

  module: string,

  permission: string,
) {
  return permissions.some(
    (p) => p.module === module && p.permission === permission,
  );
}

export function getFirstAccessibleRoute(
  permissions: {
    href: string;

    position: number;

    permission: string;
  }[],
) {
  const modules = permissions

    .filter((p) => p.permission === "VIEW")

    .sort((a, b) => a.position - b.position);

  return modules[0]?.href || "/unauthorized";
}
