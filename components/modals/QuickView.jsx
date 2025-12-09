"use client";
import React, { useState } from "react";
import Image from "next/image";
import SizeSelect from "../productDetails/SizeSelect";
import ColorSelect from "../productDetails/ColorSelect";
import Grid5 from "../productDetails/grids/Grid5";
import { useContextElement } from "@/context/Context";
import QuantitySelect from "../productDetails/QuantitySelect";
import { Modal } from "react-bootstrap";

export default function QuickView() {
  const [activeColor, setActiveColor] = useState("gray");
  const [quantity, setQuantity] = useState(1);
  const {
    quickViewItem,
    addProductToCart,
    isAddedToCartProducts,
    addToWishlist,
    isAddedtoWishlist,
    addToCompareItem, setShowCompare,
    isAddedtoCompareItem,
    cartProducts,
    updateQuantity,
    showQuickView,
    setShowQuickView,
    setShowSizeGuide,
  } = useContextElement();

  const handleClose = () => setShowQuickView(false);

  // Function to open Size Guide Modal; assumes setShowSizeGuide is available from context
  const openModalSizeChoice = () => {
    if (setShowSizeGuide) {
      setShowSizeGuide(true);
    }
  };

  return (
    <Modal
      show={showQuickView}
      onHide={handleClose}
      className="fullRight modal-quick-view"
      id="quickView"
      dialogClassName="modal-dialog"
    >
      <div className="modal-content">
        <Grid5
          firstItem={quickViewItem.imgSrc}
          activeColor={activeColor}
          setActiveColor={setActiveColor}
        />
        <div className="wrap mw-100p-hidden">
          <div className="header">
            <h5 className="title">Quick View</h5>
            <span
              className="icon-close icon-close-popup cursor-pointer"
              onClick={handleClose}
            />
          </div>
          <div className="tf-product-info-list">
            <div className="tf-product-info-heading">
              <div className="tf-product-info-name">
                <div className="text text-btn-uppercase">Clothing</div>
                <h3 className="name">{quickViewItem.title}</h3>
                <div className="sub">
                  <div className="tf-product-info-rate">
                    <div className="list-star">
                      <i className="icon icon-star" />
                      <i className="icon icon-star" />
                      <i className="icon icon-star" />
                      <i className="icon icon-star" />
                      <i className="icon icon-star" />
                    </div>
                    <div className="text text-caption-1">(134 reviews)</div>
                  </div>
                  <div className="tf-product-info-sold">
                    <i className="icon icon-lightning" />
                    <div className="text text-caption-1">
                      18&nbsp;sold in last&nbsp;32&nbsp;hours
                    </div>
                  </div>
                </div>
              </div>
              <div className="tf-product-info-desc">
                <div className="tf-product-info-price">
                  <h5 className="price-on-sale font-2">
                    ${quickViewItem.price.toFixed(2)}
                  </h5>
                  {quickViewItem.oldPrice ? (
                    <>
                      <div className="compare-at-price font-2">
                        {" "}
                        ${quickViewItem.oldPrice.toFixed(2)}
                      </div>
                      <div className="badges-on-sale text-btn-uppercase">
                        -25%
                      </div>
                    </>
                  ) : (
                    ""
                  )}
                </div>
                <p>
                  The garments labelled as Committed are products that have
                  been produced using sustainable fibres or processes,
                  reducing their environmental impact.
                </p>
                <div className="tf-product-info-liveview">
                  <i className="icon icon-eye" />
                  <p className="text-caption-1">
                    <span className="liveview-count">28</span> people are
                    viewing this right now
                  </p>
                </div>
              </div>
            </div>
            <div className="tf-product-info-choose-option">
              <ColorSelect
                activeColor={activeColor}
                setActiveColor={setActiveColor}
              />
              <SizeSelect />
              <div className="tf-product-info-quantity">
                <div className="title mb_12">Quantity:</div>
                <QuantitySelect
                  quantity={
                    isAddedToCartProducts(quickViewItem.id)
                      ? cartProducts.filter(
                        (elm) => elm.id == quickViewItem.id
                      )[0].quantity
                      : quantity
                  }
                  setQuantity={(qty) => {
                    if (isAddedToCartProducts(quickViewItem.id)) {
                      updateQuantity(quickViewItem.id, qty);
                    } else {
                      setQuantity(qty);
                    }
                  }}
                />
              </div>
              <div>
                <div className="tf-product-info-by-btn mb_10">
                  <a
                    className="btn-style-2 flex-grow-1 text-btn-uppercase fw-6 show-shopping-cart cursor-pointer"
                    onClick={() =>
                      addProductToCart(quickViewItem.id, quantity)
                    }
                  >
                    <span>
                      {isAddedToCartProducts(quickViewItem.id)
                        ? "Already Added"
                        : "Add to cart -"}
                    </span>
                    <span className="tf-qty-price total-price">
                      $&nbsp;
                      {isAddedToCartProducts(quickViewItem.id)
                        ? (
                          quickViewItem.price *
                          cartProducts.filter(
                            (elm) => elm.id == quickViewItem.id
                          )[0].quantity
                        ).toFixed(2)
                        : (quickViewItem.price * quantity).toFixed(2)}
                    </span>
                  </a>
                </div>
                <a href="#" className="btn-style-3 text-btn-uppercase">
                  Buy it now
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
