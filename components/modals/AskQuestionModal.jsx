"use client";
import React from "react";
import { Modal } from "react-bootstrap";
import { useContextElement } from "@/context/Context";

export default function AskQuestionModal() {
    const { showAskQuestion, setShowAskQuestion } = useContextElement();

    return (
        <Modal
            show={showAskQuestion}
            onHide={() => setShowAskQuestion(false)}
            centered
            className="modal-ask-question"
            id="ask_question"
        >
            <div className="modal-content">
                <div className="header">
                    <div className="demo-title">Ask A Question</div>
                    <span
                        className="icon-close icon-close-popup"
                        onClick={() => setShowAskQuestion(false)}
                        aria-label="Close"
                    />
                </div>
                <div className="tf-ask-question-form">
                    <form onSubmit={(e) => e.preventDefault()}>
                        <div className="tf-field style-1">
                            <input
                                className="tf-field-input tf-input"
                                placeholder=" "
                                type="text"
                                name="name"
                                required
                            />
                            <label className="tf-field-label" htmlFor="">
                                Name *
                            </label>
                        </div>
                        <div className="tf-field style-1">
                            <input
                                className="tf-field-input tf-input"
                                placeholder=" "
                                type="email"
                                name="email"
                                required
                            />
                            <label className="tf-field-label" htmlFor="">
                                Email *
                            </label>
                        </div>
                        <div className="tf-field style-1">
                            <input
                                className="tf-field-input tf-input"
                                placeholder=" "
                                type="text"
                                name="phone"
                            />
                            <label className="tf-field-label" htmlFor="">
                                Phone Number
                            </label>
                        </div>
                        <div className="tf-field style-1">
                            <textarea
                                className="tf-field-input tf-input"
                                placeholder=" "
                                name="message"
                                required
                                rows={4}
                            ></textarea>
                            <label className="tf-field-label" htmlFor="">
                                Message *
                            </label>
                        </div>
                        <button
                            type="submit"
                            className="tf-btn btn-fill animate-hover-btn radius-3 w-100 justify-content-center"
                        >
                            <span>Send</span>
                        </button>
                    </form>
                </div>
            </div>
        </Modal>
    );
}
