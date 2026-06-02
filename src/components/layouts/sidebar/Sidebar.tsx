"use client";

import Link from "next/link";

import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import {
  usePathname,
} from "next/navigation";

import {
  iconMap,
} from "./iconMap";

import useSidebar
from "./useSidebar";

export default function Sidebar({

  collapsed,

  setCollapsed,

}: {

  collapsed:boolean;

  setCollapsed:
  (
    value:boolean
  )=>void;

}) {

  const pathname =
    usePathname();

  const {

    modules,

  } = useSidebar();

  return (

    <aside
      className={`
        bg-white
        border-r
        flex
        flex-col

        transition-all

        duration-300

        relative

        ${
          collapsed

          ? "w-20"

          : "w-64"

        }
      `}
    >

      <button

        className="
          absolute

          -right-3

          top-1/3

          bg-blue-500

          text-white

          p-1

          rounded-full

          shadow
        "

        onClick={() =>
          setCollapsed(
            !collapsed
          )
        }

      >

        {

          collapsed

          ?

          <ChevronRight
            size={18}
          />

          :

          <ChevronLeft
            size={18}
          />

        }

      </button>

      <nav
        className="
          flex-1
          p-2
          space-y-2
        "
      >

        {

          modules.map(
            (
              item:any
            ) => {

            const Icon =
              iconMap[
                item.icon
              ] ||
              iconMap.Settings;

            const active =

              item.href === "/"

              ?

              pathname === "/"

              :

              pathname ===
              item.href ||

              pathname.startsWith(
                item.href + "/"
              );

            return (

              <Link

                key={
                  item.id
                }

                href={
                  item.href
                }

                className={`
                  flex

                  items-center

                  gap-3

                  px-4

                  py-2

                  rounded-lg

                  text-sm

                  transition

                  ${
                    active

                    ?

                    `
                    bg-blue-100
                    text-blue-600
                    font-medium
                    `

                    :

                    `
                    text-gray-600

                    hover:bg-blue-50

                    hover:text-blue-600
                    `

                  }

                `}

              >

                <Icon
                  size={20}
                />

                {

                  !collapsed &&

                  <span>

                    {item.name}

                  </span>

                }

              </Link>

            );

          })

        }

      </nav>

    </aside>

  );

}