import PermissionGuard from "@/components/guards/PermissionGuard";
import SettingsContent from "./SettingsContent";

export default async function SettingsPage() {


  return (
    <PermissionGuard module="Cài đặt" permission="VIEW">
      <SettingsContent />

    </PermissionGuard>
  );
}