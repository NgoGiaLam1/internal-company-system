"use client";

import { ROLE_LABELS } from "../roles/labels";

type Props = {
  form: any;

  setForm: React.Dispatch<
    React.SetStateAction<any>
  >;

  roles: any[];

  departments: any[];

  isEdit?: boolean;
};

export default function EmployeeForm({
  form,
  setForm,
  roles,
  departments,
  isEdit = false,
}: Props) {

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement |
      HTMLSelectElement
    >
  ) => {

    setForm({
      ...form,
      [e.target.name]:
        e.target.value,
    });

  };

  return (
    <div className="grid grid-cols-2 gap-4">

      {/* FULL NAME */}
      <div className="col-span-2">

        <label className="text-sm text-gray-600">
          Họ tên
        </label>

        <input
          name="fullName"
          value={form.fullName}
          onChange={handleChange}
          className="
            w-full border rounded-lg
            px-3 py-2 mt-1
          "
        />

      </div>

      {/* EMAIL */}
      <div>

        <label className="text-sm text-gray-600">
          Email
        </label>

        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          className="
            w-full border rounded-lg
            px-3 py-2 mt-1
          "
        />

      </div>

      {/* PASSWORD */}
      <div>

        <label className="text-sm text-gray-600">

          {isEdit
            ? "Mật khẩu mới"
            : "Mật khẩu"}

        </label>

        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder={
            isEdit
              ? "Để trống nếu không đổi"
              : "Nhập mật khẩu"
          }
          className="
            w-full border rounded-lg
            px-3 py-2 mt-1
          "
        />

      </div>

      {/* PHONE */}
      <div>

        <label className="text-sm text-gray-600">
          Số điện thoại
        </label>

        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          className="
            w-full border rounded-lg
            px-3 py-2 mt-1
          "
        />

      </div>

      {/* POSITION */}
      <div>

        <label className="text-sm text-gray-600">
          Chức vụ
        </label>

        <input
          name="position"
          value={form.position}
          onChange={handleChange}
          className="
            w-full border rounded-lg
            px-3 py-2 mt-1
          "
        />

      </div>

      {/* DEPARTMENT */}
      <div>

        <label className="text-sm text-gray-600">
          Phòng ban
        </label>

        <select
          name="departmentId"
          value={form.departmentId}
          onChange={handleChange}
          className="
            w-full border rounded-lg
            px-3 py-2 mt-1
          "
        >

          {departments.map(
            (department: any) => (
              <option
                key={department.id}
                value={department.id}
              >
                {department.name}
              </option>
            )
          )}

        </select>

      </div>

      {/* STATUS */}
      <div>

        <label className="text-sm text-gray-600">
          Trạng thái
        </label>

        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="
            w-full border rounded-lg
            px-3 py-2 mt-1
          "
        >

          <option value="ACTIVE">
            Đang làm việc
          </option>

          <option value="INACTIVE">
            Tạm nghỉ
          </option>

          <option value="RESIGNED">
            Nghỉ việc
          </option>

        </select>

      </div>

      {/* ROLE */}
      <div className="col-span-2">

        <label className="text-sm text-gray-600">
          Quyền hạn
        </label>

        <select
          name="roleId"
          value={form.roleId}
          onChange={handleChange}
          className="
            w-full border rounded-lg
            px-3 py-2 mt-1
          "
        >

          {roles.map((role: any) => (
            <option
              key={role.id}
              value={role.id}
            >
              {ROLE_LABELS[role.name]}
            </option>
          ))}

        </select>

      </div>

    </div>
  );
}