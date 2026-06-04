export default function SidebarSkeleton({

  collapsed,

}: {

  collapsed: boolean;

}) {

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

        ${collapsed

          ? "w-20"

          : "w-64"

        }

      `}
    >

      <div
        className="
          flex-1

          p-2

          space-y-2
        "
      >

        {

          Array
            .from({
              length: 8,
            })

            .map(
              (
                _,
                index
              ) => (

                <div

                  key={
                    index
                  }

                  className="
                    flex

                    items-center

                    gap-3

                    px-4

                    py-2

                    rounded-lg
                  "

                >

                  <div
                    className="
                      h-5
                      w-5

                      rounded

                      bg-gray-200

                      animate-pulse

                      shrink-0
                    "
                  />

                  {

                    !collapsed &&

                    <div
                      className="
                        h-4

                        flex-1

                        rounded

                        bg-gray-200

                        animate-pulse
                      "
                    />

                  }

                </div>

              )
            )

        }

      </div>

    </aside>

  );

}