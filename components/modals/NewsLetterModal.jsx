"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import axios from "axios";
import { Modal } from "react-bootstrap";

export default function NewsLetterModal() {
  const pathname = usePathname();
  const [show, setShow] = useState(false);

  useEffect(() => {
    let timer;
    if (pathname === "/") {
      timer = setTimeout(() => {
        setShow(true);
      }, 2000);
    }
    return () => clearTimeout(timer);
  }, [pathname]);

  const handleClose = () => setShow(false);

  const [success, setSuccess] = useState(true);
  const [showMessage, setShowMessage] = useState(false);
  const handleShowMessage = () => {
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 2000);
  };
  const sendEmail = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    const email = e.target.email.value;

    try {
      const response = await axios.post(
        "https://express-brevomail.vercel.app/api/contacts",
        {
          email,
        }
      );

      if ([200, 201].includes(response.status)) {
        e.target.reset(); // Reset the form
        setSuccess(true); // Set success state
        handleShowMessage();
      } else {
        setSuccess(false); // Handle unexpected responses
        handleShowMessage();
      }
    } catch (error) {
      console.error("Error:", error.response?.data || "An error occurred");
      setSuccess(false); // Set error state
      handleShowMessage();
      e.target.reset(); // Reset the form
    }
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      className="auto-popup modal-newleter modalCentered"
      id="newsletterPopup"
    >
      <div className="modal-top">
        <Image
          className="lazyload"
          data-src="/images/section/newsletter.jpg"
          alt="/images"
          src="/images/section/newsletter.jpg"
          width={660}
          height={440}
        />
        <span
          className="icon icon-close btn-hide-popup"
          onClick={handleClose}
        />
      </div>
      <div className="modal-bottom text-center">
        <p className="text-btn-uppercase fw-4 font-2">
          Subscribe To Our Newletter!
        </p>
        <h5>Receive 10% OFF your next order, exclusive offers &amp; more!</h5>
        <div
          className={`tfSubscribeMsg  footer-sub-element ${showMessage ? "active" : ""
            }`}
        >
          {success ? (
            <p style={{ color: "rgb(52, 168, 83)" }}>
              You have successfully subscribed.
            </p>
          ) : (
            <p style={{ color: "red" }}>Something went wrong</p>
          )}
        </div>
        <form
          id="subscribe-form"
          onSubmit={(e) => {
            e.preventDefault();
            sendEmail(e);
          }}
          className="form-newsletter-subscribe"
        >
          <div id="subscribe-content">
            <input
              type="email"
              name="email"
              id="subscribe-email"
              placeholder="Enter your e-mail"
              required
            />
            <button
              type="submit"
              id="subscribe-button"
              className="btn-style-2 radius-12 w-100 justify-content-center"
            >
              <span className="text text-btn-uppercase">SUBSCRIBE</span>
            </button>
          </div>
          <div id="subscribe-msg" />
        </form>
        <ul className="tf-social-icon style-default justify-content-center">
          <li>
            <a href="#" className="social-facebook">
              <i className="icon icon-fb" />
            </a>
          </li>
          <li>
            <a href="#" className="social-twiter">
              <i className="icon icon-x" />
            </a>
          </li>
          <li>
            <a href="#" className="social-instagram">
              <i className="icon icon-instagram" />
            </a>
          </li>
          <li>
            <a href="#" className="social-pinterest">
              <i className="icon icon-pinterest" />
            </a>
          </li>
        </ul>
      </div>
    </Modal>
  );
}
