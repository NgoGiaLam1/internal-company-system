import { prisma } from "@/lib/prisma";
import EmployeesPageContent
  from "../../../components/employees/EmployeesPageContent";

export default async function EmployeesPage() {

  const employees =
    await prisma.tblEmployee.findMany({
      include: {
        role: true,
      },

      orderBy: {
        createdAt: "desc",
      },
    });

  const roles =
    await prisma.tblRole.findMany({
      orderBy: {
        createdAt: "asc",
      },
    });

  return (
    <EmployeesPageContent
      employees={employees}
      roles={roles}
    />
  );
}