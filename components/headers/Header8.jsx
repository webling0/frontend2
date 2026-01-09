import React from "react";
import Nav from "./Nav";
import Image from "next/image";
import Link from "next/link";
import CartLength from "../common/CartLength";
import MobileMenuTrigger from "./MobileMenuTrigger";
import SearchTrigger from "./SearchTrigger";
import CartTrigger from "./CartTrigger";
// import { useContextElement } from "@/context/Context"; // Removed

export default function Header8() {
  // const { setShowSearch, setShowCart, setShowMobileMenu } = useContextElement(); // Removed
  return (
    <header id="header" className="header-default header-absolute">
      <div className="container">
        <div className="row wrapper-header align-items-center">
          <div className="col-md-4 col-3 d-xl-none">
            <MobileMenuTrigger />
          </div>
          <div className="col-xl-3 col-md-4 col-6">
            <Link href={`/`} className="logo-header">
              <Image
                alt="logo"
                className="logo"
                src="/images/logo/logo.svg"
                width={144}
                height={25}
              />
            </Link>
          </div>
          <div className="col-xl-6 d-none d-xl-block">
            <nav className="box-navigation text-center">
              <ul className="box-nav-ul d-flex align-items-center justify-content-center">
                <Nav />
              </ul>
            </nav>
          </div>
          <div className="col-xl-3 col-md-4 col-3">
            <ul className="nav-icon d-flex justify-content-end align-items-center">
              <li className="nav-search">
                <SearchTrigger>
                  <span className="icon icon-search2" />
                </SearchTrigger>
              </li>
              <li className="nav-account">
                <a href="#" className="nav-icon-item">
                  <span className="icon icon-user" />
                </a>
                <div className="dropdown-account dropdown-login">
                  <div className="sub-top">
                    <Link href={`/account/login`} className="tf-btn btn-reset">
                      Login
                    </Link>
                    <p className="text-center text-secondary-2">
                      Don’t have an account?{" "}
                      <Link href={`/register`}>Register</Link>
                    </p>
                  </div>
                  <div className="sub-bot">
                    <span className="body-text-">Support</span>
                  </div>
                </div>
              </li>
              {/* <li className="nav-wishlist">
                <Link href={`/wish-list`} className="nav-icon-item">
                  <span className="icon icon-heart" />
                </Link>
              </li> */}
              <li className="nav-cart">
                <CartTrigger>
                  <span className="icon icon-ShoppingBagOpen" />
                  <span className="count-box">
                    <CartLength />
                  </span>
                </CartTrigger>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}
