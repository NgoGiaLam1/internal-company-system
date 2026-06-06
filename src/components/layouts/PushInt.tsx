"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";

import {
    subscribePush
} from "@/lib/push";

export default function PushInit() {

    const {
        data: session
    } = useSession();

    useEffect(() => {

        if (
            session?.user?.id
        ) {

            subscribePush(
                session.user.id
            );

        }

    }, [
        session?.user?.id
    ]);

    return null;

}