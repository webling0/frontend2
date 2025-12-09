"use client";
import React from "react";

export default function AddToCart({
    onClick,
    isAdded,
    price,
    text = "Add to cart -",
    addedText = "Already Added",
}) {
    return (
        <div className="tf-product-info-by-btn mb_10">
            <a
                onClick={onClick}
                className="btn-style-2 flex-grow-1 text-btn-uppercase fw-6 btn-add-to-cart"
            >
                <span>{isAdded ? addedText : text}</span>
                <span className="tf-qty-price total-price">${price}</span>
            </a>
        </div>
    );
}
