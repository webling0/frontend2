"use client";
import React from "react";
import { Modal } from "react-bootstrap";
import { useContextElement } from "@/context/Context";

export default function DeliveryReturnModal() {
    const { showDeliveryReturn, setShowDeliveryReturn } = useContextElement();

    return (
        <Modal
            show={showDeliveryReturn}
            onHide={() => setShowDeliveryReturn(false)}
            centered
            className="modal-delivery-return"
            id="delivery_return"
        >
            <div className="modal-content">
                <div className="header">
                    <div className="demo-title">Delivery & Return</div>
                    <span
                        className="icon-close icon-close-popup"
                        onClick={() => setShowDeliveryReturn(false)}
                        aria-label="Close"
                    />
                </div>
                <div className="tf-rte">
                    <p>
                        We deliver to over 100 countries around the world. For full details
                        of the delivery options we offer, please view our{" "}
                        <a href="#" className="link">
                            Delivery Information
                        </a>
                        .
                    </p>
                    <p>
                        We hope you’ll love every purchase, but if you ever need to return
                        an item you can do so within a month of receipt. For full details of
                        how to make a return, please view our{" "}
                        <a href="#" className="link">
                            Returns information
                        </a>
                        .
                    </p>
                </div>
            </div>
        </Modal>
    );
}
