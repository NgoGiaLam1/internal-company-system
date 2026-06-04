import { NextResponse } from "next/server";

import { getServerSession }
from "next-auth";

import { authOptions }
from "@/auth.config";

import { prisma }
from "@/lib/prisma";

export async function GET() {

  const session =
    await getServerSession(
      authOptions
    );

  if (
    !session?.user?.id
  ) {

    return NextResponse.json(
      [],
      {
        status: 401,
      }
    );

  }

  const employee =
    await prisma.tblEmployee.findUnique({

      where: {

        id:
          session.user.id,

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

    employee?.role
      ?.rolePermissions
      .map(
        rp => ({

          module:

            rp.permission
              .module
              .name,

          permission:

            rp.permission
              .name,

        })
      )

      ?? [];

  return NextResponse.json(
    permissions
  );

}