"use client";

import {
  useEffect,
  useState,
} from "react";

export default function
useRolePermissions(
  roleId?: string
) {

  const [
    permissions,

    setPermissions,

  ] = useState<any[]>(
    []
  );

  const [
    loading,

    setLoading,

  ] = useState(
    false
  );

  useEffect(() => {

    if (!roleId)
      return;

    async function load() {

      setLoading(
        true
      );

      try {

        const res =
          await fetch(
            `/api/roles/${roleId}/permissions`
          );

        const data =
          await res.json();

        setPermissions(
          data
        );

      }

      finally {

        setLoading(
          false
        );

      }

    }

    load();

  }, [roleId]);

  return {

    permissions,

    loading,

  };

}