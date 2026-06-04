import PermissionGuard
from "@/components/guards/PermissionGuard";

import DashboardContent
from "./DashboardContent";

export default async function Home() {

  return (

    <PermissionGuard

      module="Tổng quan"

      permission="VIEW"

    >

      <DashboardContent />

    </PermissionGuard>

  );

}