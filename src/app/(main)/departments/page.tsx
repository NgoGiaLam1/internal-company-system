import { prisma } from "@/lib/prisma";

import DepartmentsPageContent
  from "@/components/departments/DepartmentsPageContent";

export default async function DepartmentsPage() {

  const departments =
    await prisma.tblDepartment.findMany({
      include: {
        employees: true,
      },

      orderBy: {
        createdAt: "desc",
      },
    });

  return (
    <DepartmentsPageContent
      departments={departments}
    />
  );
}