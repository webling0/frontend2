"use client";
import React from "react";
import { useContextElement } from "@/context/Context";

export default function SearchTrigger({ children }) {
    const { setShowSearch } = useContextElement();
    if (children) {
        return (
            <a
                className="nav-icon-item cursor-pointer"
                onClick={() => setShowSearch(true)}
            >
                {children}
            </a>
        );
    }
    return (
        <a
            className="nav-icon-item cursor-pointer"
            onClick={() => setShowSearch(true)}
        >
            <svg
                className="icon"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
                    stroke="#181818"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M21.35 21.0004L17 16.6504"
                    stroke="#181818"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        </a>
    );
}
