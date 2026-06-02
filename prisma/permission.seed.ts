import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const PERMISSIONS = ["VIEW", "CREATE", "UPDATE", "DELETE"];

export async function seedPermissions() {
  const modules = await prisma.tblModule.findMany({
    select: {
      id: true,
    },
  });

  const data = modules.flatMap((module) =>
    PERMISSIONS.map((permission) => ({
      moduleId: module.id,

      name: permission,
    })),
  );

  await prisma.tblPermission.createMany({
    data,

    skipDuplicates: true,
  });

  console.log(`Created ${data.length} permissions`);
}
