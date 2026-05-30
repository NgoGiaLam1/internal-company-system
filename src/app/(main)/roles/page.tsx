import { prisma } from "@/lib/prisma";

import RolesPageContent
  from "@/components/roles/RolesPageContent";

export default async function RolesPage() {

  const roles =
    await prisma.tblRole.findMany({
      include: {
        rolePermissions: {
          include: {
            permission: true,
          },
        },

        employees: true,
      },
    });

  return (
    <RolesPageContent
      roles={roles}
    />
  );
}