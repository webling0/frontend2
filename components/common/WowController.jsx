"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function WowController() {
    const pathname = usePathname();

    useEffect(() => {
        const initWow = async () => {
            const WOW = (await import("@/utlis/wow")).default;
            const wow = new WOW({
                mobile: false,
                live: false,
            });
            wow.init();
        };
        initWow();
    }, [pathname]);

    return null;
}
