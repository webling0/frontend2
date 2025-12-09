"use client";
import React from "react";
import { Modal } from "react-bootstrap";
import { useContextElement } from "@/context/Context";

export default function ShareModal() {
    const { showShare, setShowShare } = useContextElement();

    return (
        <Modal
            show={showShare}
            onHide={() => setShowShare(false)}
            centered
            className="modal-share-social"
            id="share_social"
        >
            <div className="modal-content">
                <div className="header">
                    <div className="demo-title">Share</div>
                    <span
                        className="icon-close icon-close-popup"
                        onClick={() => setShowShare(false)}
                        aria-label="Close"
                    />
                </div>
                <div className="tf-social-list">
                    <ul className="social-icon">
                        <li>
                            <a href="#" className="box-icon social-facebook">
                                <i className="icon icon-facebook" />
                            </a>
                        </li>
                        <li>
                            <a href="#" className="box-icon social-twitter">
                                <i className="icon icon-twitter" />
                            </a>
                        </li>
                        <li>
                            <a href="#" className="box-icon social-instagram">
                                <i className="icon icon-instagram" />
                            </a>
                        </li>
                        <li>
                            <a href="#" className="box-icon social-pinterest">
                                <i className="icon icon-pinterest" />
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </Modal>
    );
}
