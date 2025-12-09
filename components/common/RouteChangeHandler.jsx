"use client";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useContextElement } from "@/context/Context";

export default function RouteChangeHandler() {
    const pathname = usePathname();
    const {
        setShowCart,
        setShowSearch,
        setShowWishlist,
        setShowQuickView,
        setShowQuickAdd,
        setShowSizeGuide,
        setShowMobileMenu,
        setShowDemo,
        setShowCompare,
        setShowCategories,
        setShowLogin,
        setShowDeliveryReturn,
        setShowAskQuestion,
        setShowShare,
    } = useContextElement();

    useEffect(() => {
        // Close all modals and offcanvases on route change
        setShowCart(false);
        setShowSearch(false);
        setShowWishlist(false);
        setShowQuickView(false);
        setShowQuickAdd(false);
        setShowSizeGuide(false);
        setShowMobileMenu(false);
        setShowDemo(false);
        setShowCompare(false);
        setShowCategories(false);
        setShowLogin(false);
        setShowDeliveryReturn(false);
        setShowAskQuestion(false);
        setShowShare(false);
    }, [pathname]);

    return null;
}
