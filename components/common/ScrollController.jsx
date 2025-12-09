"use client";

import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";

export default function ScrollController() {
    const pathname = usePathname();
    const [scrollDirection, setScrollDirection] = useState("down");
    const lastScrollY = useRef(0);

    // Handle header background on scroll
    useEffect(() => {
        const handleScroll = () => {
            const header = document.querySelector("header");
            if (header) {
                if (window.scrollY > 100) {
                    header.classList.add("header-bg");
                } else {
                    header.classList.remove("header-bg");
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    // Handle scroll direction
    useEffect(() => {
        setScrollDirection("up");
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY > 250) {
                if (currentScrollY > lastScrollY.current) {
                    // Scrolling down
                    setScrollDirection("down");
                } else {
                    // Scrolling up
                    setScrollDirection("up");
                }
            } else {
                // Below 250px
                setScrollDirection("down");
            }

            lastScrollY.current = currentScrollY;
        };

        lastScrollY.current = window.scrollY;

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [pathname]);

    // Apply sticky header styles based on direction
    useEffect(() => {
        const header = document.querySelector("header");
        if (header) {
            if (scrollDirection === "up") {
                header.style.top = "0px";
            } else {
                header.style.top = "-185px";
            }
        }
    }, [scrollDirection]);

    return null;
}
