"use client";
import React from "react";
import { useContextElement } from "@/context/Context";

export default function MobileMenuTrigger({ className = "mobile-menu cursor-pointer" }) {
    const { setShowMobileMenu } = useContextElement();

    return (
        <a onClick={() => setShowMobileMenu(true)} className={className}>
            <i className="icon icon-categories" />
        </a>
    );
}
