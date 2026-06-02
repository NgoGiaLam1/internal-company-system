import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,

  {
    params,
  }: {
    params: Promise<{ id: string }>;
  },
) {
  const { id } = await params;

  const modules = await prisma.tblModule.findMany({
    orderBy: {
      position: "asc",
    },

    include: {
      permissions: {
        orderBy: {
          name: "asc",
        },

        include: {
          rolePermissions: {
            where: {
              roleId: id,
            },
          },
        },
      },
    },
  });

  const result = modules.map((module) => ({
    module: module.name,

    permissions: module.permissions.map((permission) => ({
      id: permission.id,

      name: permission.name,

      checked: permission.rolePermissions.length > 0,
    })),
  }));

  return NextResponse.json(result);
}

export async function PUT(
  req: Request,

  {
    params,
  }: {
    params: Promise<{ id: string }>;
  },
) {
  const { id } = await params;

  const body = await req.json();

  const permissionIds: string[] = body.permissionIds;

  await prisma.$transaction([
    prisma.tblRolePermission.deleteMany({
      where: {
        roleId: id,
      },
    }),

    prisma.tblRolePermission.createMany({
      data: permissionIds.map((permissionId) => ({
        roleId: id,

        permissionId,
      })),

      skipDuplicates: true,
    }),
  ]);

  return NextResponse.json({
    success: true,
  });
}
