"use client";
import React from "react";
import { Modal } from "react-bootstrap";
import { useContextElement } from "@/context/Context";
import Link from "next/link";

export default function LoginModal() {
    const { showLogin, setShowLogin } = useContextElement();

    return (
        <Modal
            show={showLogin}
            onHide={() => setShowLogin(false)}
            centered
            className="modal-login"
            id="login"
        >
            <div className="modal-content">
                <div className="header">
                    <div className="demo-title">Log in</div>
                    <span
                        className="icon-close icon-close-popup"
                        onClick={() => setShowLogin(false)}
                    />
                </div>
                <div className="tf-login-form">
                    <form onSubmit={(e) => e.preventDefault()} className="">
                        <div className="tf-field style-1">
                            <input
                                className="tf-field-input tf-input"
                                placeholder=" "
                                type="email"
                                autoComplete="abc@xyz.com"
                                required
                                name="email"
                            />
                            <label className="tf-field-label" htmlFor="">
                                Email *
                            </label>
                        </div>
                        <div className="tf-field style-1">
                            <input
                                className="tf-field-input tf-input"
                                placeholder=" "
                                type="password"
                                required
                                name="current_password"
                                autoComplete="current-password"
                            />
                            <label className="tf-field-label" htmlFor="">
                                Password *
                            </label>
                        </div>
                        <div>
                            <a href="#forgotPassword" className="btn-link link">
                                Forgot your password?
                            </a>
                        </div>
                        <div className="bottom">
                            <div className="w-100">
                                <button
                                    type="submit"
                                    className="tf-btn btn-fill animate-hover-btn radius-3 w-100 justify-content-center"
                                >
                                    <span>Log in</span>
                                </button>
                            </div>
                            <div className="w-100">
                                <Link
                                    href="/register"
                                    onClick={() => setShowLogin(false)}
                                    className="btn-link btn-link-icon justify-content-center"
                                >
                                    New customer? Create your account
                                    <i className="icon icon-arrow1-top-left" />
                                </Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </Modal>
    );
}
