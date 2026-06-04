"use client";

import { useEffect, useState, useCallback } from "react";

type Permission = {
  module: string;

  permission: string;
};

export default function usePermission() {
  const [permissions, setPermissions] = useState<Permission[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/me/permissions");

        const data = await res.json();

        setPermissions(data);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  const hasPermission = useCallback(
    (
      module: string,

      permission: string,
    ) =>
      permissions.some(
        (p) => p.module === module && p.permission === permission,
      ),

    [permissions],
  );

  return {
    loading,

    permissions,

    hasPermission,
  };
}
