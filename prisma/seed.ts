import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Bắt đầu seed dữ liệu...");

  // ======================
  // PASSWORD MẶC ĐỊNH
  // ======================

  const defaultPassword = await bcrypt.hash("123456", 10);

  // ======================
  // PERMISSIONS
  // ======================

  const permissions = await Promise.all([
    prisma.tblPermission.upsert({
      where: { name: "employee.view" },
      update: {},
      create: {
        name: "employee.view",
        description: "Xem danh sách nhân viên",
      },
    }),

    prisma.tblPermission.upsert({
      where: { name: "employee.create" },
      update: {},
      create: {
        name: "employee.create",
        description: "Tạo nhân viên",
      },
    }),

    prisma.tblPermission.upsert({
      where: { name: "employee.update" },
      update: {},
      create: {
        name: "employee.update",
        description: "Cập nhật nhân viên",
      },
    }),

    prisma.tblPermission.upsert({
      where: { name: "employee.delete" },
      update: {},
      create: {
        name: "employee.delete",
        description: "Xóa nhân viên",
      },
    }),

    prisma.tblPermission.upsert({
      where: { name: "project.view" },
      update: {},
      create: {
        name: "project.view",
        description: "Xem dự án",
      },
    }),

    prisma.tblPermission.upsert({
      where: { name: "project.create" },
      update: {},
      create: {
        name: "project.create",
        description: "Tạo dự án",
      },
    }),

    prisma.tblPermission.upsert({
      where: { name: "task.view" },
      update: {},
      create: {
        name: "task.view",
        description: "Xem công việc",
      },
    }),

    prisma.tblPermission.upsert({
      where: { name: "task.update" },
      update: {},
      create: {
        name: "task.update",
        description: "Cập nhật công việc",
      },
    }),
  ]);

  // ======================
  // ROLES
  // ======================

  const adminRole = await prisma.tblRole.upsert({
    where: { name: "ADMIN" },
    update: {},
    create: {
      name: "ADMIN",
      description: "Quản trị hệ thống",
    },
  });

  const managerRole = await prisma.tblRole.upsert({
    where: { name: "MANAGER" },
    update: {},
    create: {
      name: "MANAGER",
      description: "Quản lý dự án",
    },
  });

  const employeeRole = await prisma.tblRole.upsert({
    where: { name: "EMPLOYEE" },
    update: {},
    create: {
      name: "EMPLOYEE",
      description: "Nhân viên",
    },
  });

  // ======================
  // ROLE PERMISSIONS
  // ======================

  // ADMIN -> full quyền
  for (const permission of permissions) {
    await prisma.tblRolePermission.upsert({
      where: {
        roleId_permissionId: {
          roleId: adminRole.id,
          permissionId: permission.id,
        },
      },
      update: {},
      create: {
        roleId: adminRole.id,
        permissionId: permission.id,
      },
    });
  }

  // MANAGER
  const managerPermissions = permissions.filter((p) =>
    [
      "employee.view",
      "project.view",
      "project.create",
      "task.view",
      "task.update",
    ].includes(p.name)
  );

  for (const permission of managerPermissions) {
    await prisma.tblRolePermission.upsert({
      where: {
        roleId_permissionId: {
          roleId: managerRole.id,
          permissionId: permission.id,
        },
      },
      update: {},
      create: {
        roleId: managerRole.id,
        permissionId: permission.id,
      },
    });
  }

  // EMPLOYEE
  const employeePermissions = permissions.filter((p) =>
    ["project.view", "task.view"].includes(p.name)
  );

  for (const permission of employeePermissions) {
    await prisma.tblRolePermission.upsert({
      where: {
        roleId_permissionId: {
          roleId: employeeRole.id,
          permissionId: permission.id,
        },
      },
      update: {},
      create: {
        roleId: employeeRole.id,
        permissionId: permission.id,
      },
    });
  }
  // ======================
  // DEPARTMENTS
  // ======================

  const boardDepartment =
    await prisma.tblDepartment.upsert({
      where: {
        name: "Ban giám đốc",
      },
      update: {},
      create: {
        name: "Ban giám đốc",
        description:
          "Quản lý và điều hành công ty",
      },
    });

  const techDepartment =
    await prisma.tblDepartment.upsert({
      where: {
        name: "Phòng kỹ thuật",
      },
      update: {},
      create: {
        name: "Phòng kỹ thuật",
        description:
          "Phát triển hệ thống và phần mềm",
      },
    });

  const designDepartment =
    await prisma.tblDepartment.upsert({
      where: {
        name: "Phòng thiết kế",
      },
      update: {},
      create: {
        name: "Phòng thiết kế",
        description:
          "Thiết kế UI/UX và hình ảnh",
      },
    });
  // ======================
  // EMPLOYEES
  // ======================

  const admin = await prisma.tblEmployee.upsert({
    where: { email: "admin@gmail.com" },
    update: {},
    create: {
      fullName: "Ngô Gia Lâm",
      email: "admin@gmail.com",
      password: defaultPassword,
      phone: "0900000001",
      departmentId: boardDepartment.id,
      position: "Quản trị viên",
      roleId: adminRole.id,
      status: "ACTIVE",
    },
  });

  const manager = await prisma.tblEmployee.upsert({
    where: { email: "manager@gmail.com" },
    update: {},
    create: {
      fullName: "Trần Minh Quang",
      email: "manager@gmail.com",
      password: defaultPassword,
      phone: "0900000002",
      departmentId: techDepartment.id,
      position: "Trưởng phòng",
      roleId: managerRole.id,
      status: "ACTIVE",
    },
  });

  const employee1 = await prisma.tblEmployee.upsert({
    where: { email: "an.nguyen@gmail.com" },
    update: {},
    create: {
      fullName: "Nguyễn Văn An",
      email: "an.nguyen@gmail.com",
      password: defaultPassword,
      phone: "0900000003",
      departmentId: techDepartment.id,
      position: "Frontend Developer",
      roleId: employeeRole.id,
      status: "ACTIVE",
    },
  });

  const employee2 = await prisma.tblEmployee.upsert({
    where: { email: "binh.tran@gmail.com" },
    update: {},
    create: {
      fullName: "Trần Gia Bình",
      email: "binh.tran@gmail.com",
      password: defaultPassword,
      phone: "0900000004",
      departmentId: techDepartment.id,
      position: "Backend Developer",
      roleId: employeeRole.id,
      status: "ACTIVE",
    },
  });

  const employee3 = await prisma.tblEmployee.upsert({
    where: { email: "linh.le@gmail.com" },
    update: {},
    create: {
      fullName: "Lê Thị Linh",
      email: "linh.le@gmail.com",
      password: defaultPassword,
      phone: "0900000005",
      departmentId: designDepartment.id,
      position: "UI/UX Designer",
      roleId: employeeRole.id,
      status: "ACTIVE",
    },
  });

  // ======================
  // PROJECTS
  // ======================

  const project1 = await prisma.tblProject.create({
    data: {
      name: "Hệ thống quản lý nhân sự",
      description: "Xây dựng hệ thống quản lý nhân sự nội bộ công ty",
      leaderId: manager.id,
      startDate: new Date("2026-05-01"),
      endDate: new Date("2026-08-30"),
      status: "IN_PROGRESS",

      members: {
        connect: [
          { id: manager.id },
          { id: employee1.id },
          { id: employee2.id },
          { id: employee3.id },
        ],
      },
    },
  });

  const project2 = await prisma.tblProject.create({
    data: {
      name: "Website bán hàng",
      description: "Phát triển website thương mại điện tử",
      leaderId: manager.id,
      startDate: new Date("2026-04-01"),
      endDate: new Date("2026-07-15"),
      status: "PLANNING",

      members: {
        connect: [{ id: employee1.id }, { id: employee2.id }],
      },
    },
  });

  // ======================
  // TASKS
  // ======================

  await prisma.tblTask.createMany({
    data: [
      {
        title: "Thiết kế giao diện dashboard",
        description: "Thiết kế UI dashboard cho admin",
        status: "IN_PROGRESS",
        priority: "HIGH",
        projectId: project1.id,
        assigneeId: employee3.id,
        startDate: new Date("2026-05-10"),
        dueDate: new Date("2026-05-25"),
      },

      {
        title: "Xây dựng API đăng nhập",
        description: "Tạo API authentication bằng NextAuth",
        status: "TODO",
        priority: "HIGH",
        projectId: project1.id,
        assigneeId: employee2.id,
        startDate: new Date("2026-05-12"),
        dueDate: new Date("2026-05-28"),
      },

      {
        title: "Tạo trang danh sách nhân viên",
        description: "Hiển thị table nhân viên + filter",
        status: "DONE",
        priority: "MEDIUM",
        projectId: project1.id,
        assigneeId: employee1.id,
        startDate: new Date("2026-05-01"),
        dueDate: new Date("2026-05-15"),
        submittedAt: new Date(),
        resultNote: "Hoàn thành giao diện và phân trang",
      },

      {
        title: "Phân tích yêu cầu hệ thống",
        description: "Thu thập yêu cầu từ khách hàng",
        status: "IN_PROGRESS",
        priority: "LOW",
        projectId: project2.id,
        assigneeId: manager.id,
        startDate: new Date("2026-05-05"),
        dueDate: new Date("2026-05-20"),
      },
    ],
  });

  // ======================
  // LEAVE REQUESTS
  // ======================

  await prisma.tblLeaveRequest.createMany({
    data: [
      {
        employeeId: employee1.id,
        startDate: new Date("2026-06-10"),
        endDate: new Date("2026-06-12"),
        reason: "Nghỉ phép du lịch cùng gia đình",
        status: "APPROVED",
      },

      {
        employeeId: employee2.id,
        startDate: new Date("2026-06-15"),
        endDate: new Date("2026-06-16"),
        reason: "Khám sức khỏe định kỳ",
        status: "PENDING",
      },

      {
        employeeId: employee3.id,
        startDate: new Date("2026-06-20"),
        endDate: new Date("2026-06-22"),
        reason: "Việc cá nhân",
        status: "REJECTED",
      },
    ],
  });

  console.log("✅ Seed dữ liệu thành công");
}

main()
  .catch((e) => {
    console.error("❌ Seed thất bại");
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });