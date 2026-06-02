"use client";

import { useEffect, useState } from "react";

export default function useSidebar() {
  const [modules, setModules] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/modules/sidebar");

        const data = await res.json();

        setModules(data);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  return {
    modules,

    loading,
  };
}
