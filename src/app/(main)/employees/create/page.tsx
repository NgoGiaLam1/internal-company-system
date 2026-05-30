import { prisma } from "@/lib/prisma";

import CreateEmployeePageContent
  from "@/components/employees/CreateEmployeePageContent";

export default async function CreateEmployeePage() {

  const roles =
    await prisma.tblRole.findMany({
      orderBy: {
        createdAt: "asc",
      },
    });

  const departments =
    await prisma.tblDepartment.findMany({
      orderBy: {
        createdAt: "asc",
      },
    });

  return (
    <CreateEmployeePageContent
      roles={roles}
      departments={departments}
    />
  );
}