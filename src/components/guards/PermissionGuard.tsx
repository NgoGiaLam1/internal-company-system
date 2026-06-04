import { redirect }
    from "next/navigation";

import {

    getUserPermissions,

    hasPermission,

    getFirstAccessibleRoute,

}
    from "@/lib/permissions";
import { getCurrentUser } from "@/lib/auth";

export default async function PermissionGuard({

    module,

    permission,

    children,

}: {

    module: string;

    permission: string;

    children:
    React.ReactNode;

}) {
    const user =
        await getCurrentUser();

    if (!user?.id) {

        redirect(
            "/login"
        );

    }
    const permissions =

        await getUserPermissions(

            user.id

        );

    const allowed =

        hasPermission(

            permissions,

            module,

            permission,

        );

    if (!allowed) {

        redirect(

            getFirstAccessibleRoute(
                permissions
            )

        );

    }

    return <>

        {children}

    </>;

}