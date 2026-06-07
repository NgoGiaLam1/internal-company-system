import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import ProjectTabsContent from "@/components/projects/ProjectTabsContent";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function ProjectDetailPage({
  params,
}: Props) {
  const { id } = await params;

  const employees = await prisma.tblEmployee.findMany();

  const project = await prisma.tblProject.findUnique({
    where: { id },

    include: {
      leader: true,

      members: true,

      tasks: {
        include: {
          assignee: true,
        },
      },
    },
  });

  if (!project) return notFound();

  return (
    <div className="space-y-6">
      <ProjectTabsContent
        project={project}
        employees={employees}
      />

    </div>
  );
}